import { uniqueId } from '@card-games/utilities'
import { match } from 'basis/libraries/utilities'
import type { Server } from 'bun'
import { AssetsController } from './controllers/AssetsController'
import { GameController } from './controllers/GameController'
import { WebSocketController } from './controllers/WebSocketController'
import { GameCatalog } from './GameCatalog'
// @ts-expect-error - Bun supports dynamic imports with types, but TS is confused
import html from './index.html' with { type: 'text' }
import type { UserProfile } from './types/UserProfile'

const COOKIE_NAME = 'user_profile'
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 1 year in seconds
const CORS_HEADERS = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
}

export class GameServer {
  static #singleton: GameServer
  static singleton() {
    if (!this.#singleton) this.#singleton = new GameServer()
    return this.#singleton
  }

  private readonly assets = AssetsController.singleton()
  private readonly catalog = GameCatalog.singleton()
  private readonly gameController = GameController.singleton()
  private readonly ws = WebSocketController.singleton()
  private readonly server: Server

  constructor() {
    this.initialize()
    this.server = Bun.serve({
      fetch: this.request.bind(this),
      port: Bun.env.PORT ?? 80,
      websocket: {
        message: this.ws.onMessage,
        open: this.ws.onConnect,
      },
    })
  }

  async initialize() {
    await this.assets.initialize()
    await this.catalog.initialize()
  }

  private createUserCookie(profile: UserProfile): string {
    const cookieValue = btoa(JSON.stringify(profile))
    return [
      `${COOKIE_NAME}=${cookieValue}`,
      'Path=/',
      `Max-Age=${COOKIE_MAX_AGE}`,
      'HttpOnly',
      'SameSite=Strict',
    ].join('; ')
  }
  private parseUserCookie(request: Request): UserProfile | null {
    const cookie = request.headers.get('cookie')
    if (!cookie) return null
    const userProfile = cookie.split(';').find(c => c.trim().startsWith(`${COOKIE_NAME}=`))
    if (!userProfile) return null
    return JSON.parse(atob(userProfile.split('=')[1]))
  }

  private request(request: Request, server: Server): Response | Promise<Response> {
    const url = new URL(request.url)
    const profile = this.parseUserCookie(request) || {
      id: uniqueId(),
      name: `Player ${uniqueId(6)}`,
    }

    // handle CORS preflight checks
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    return match(url.pathname)
      .when('/ws').then(() => (
        server.upgrade(request, { data: { profile }, headers: CORS_HEADERS })
          ? new Response()
          : new Response(null, { status: 400 })
      ))
      .when('/api/games').then(() => this.gameController.catalog())
      .when(/^[/]assets/).then(() => this.assets.request(request))
      .else(new Response(html, {
        headers: {
          'Content-Type': 'text/html',
          'Set-Cookie': this.createUserCookie(profile),
        },
      }))
  }

  dispose() {
    this.server.stop()
    this.ws.dispose()
    this.assets.dispose()
  }
}
