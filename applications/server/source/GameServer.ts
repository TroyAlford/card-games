import { match } from 'basis/libraries/utilities/functions/match'
import type { Server } from 'bun'
import { AssetsController } from './controllers/AssetsController'
import { GameController } from './controllers/GameController'
import { WebSocketController } from './controllers/WebSocketController'
import { GameCatalog } from './GameCatalog'
// @ts-expect-error - Bun supports dynamic imports with types, but TS is confused
import html from './index.html' with { type: 'text' }

const CORS_HEADERS = {
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
      fetch: this.fetch,
      port: Bun.env.PORT ?? 80,
      websocket: {
        message: this.ws.handleMessage,
        open: this.ws.handleOpen,
      },
    })
  }

  async initialize() {
    await this.assets.initialize()
    await this.catalog.initialize()
  }

  private fetch = (request: Request, server: Server) => {
    const url = new URL(request.url)

    // handle CORS preflight checks
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    return match(url.pathname)
      .when('/ws').then(() => (
        server.upgrade(request, { headers: CORS_HEADERS })
          ? new Response()
          : new Response(null, { status: 400 })
      ))
      .when('/api/games').then(() => this.gameController.catalog())
      .when(/^[/]assets/).then(() => this.assets.request(request))
      .else(new Response(html, { headers: { 'Content-Type': 'text/html' } }))
  }

  dispose() {
    this.server.stop()
    this.assets.dispose()
  }
}
