import { GameFactory } from '@card-games/card-game'
import { uniqueId } from '@card-games/utilities'
import type { ServerWebSocket } from 'bun'
import type { GameLobby } from '../types/GameLobby'
import type { UserProfile } from '../types/UserProfile'

export interface WebSocketData {
  connectionId: string,
  gameId?: string,
  profile: UserProfile,
}

export class WebSocketController {
  private static instance: WebSocketController
  private connections = new Map<string, ServerWebSocket<WebSocketData>>()
  private gameFactory = GameFactory.singleton()
  private games = new Map<string, GameLobby>()

  static singleton(): WebSocketController {
    if (!WebSocketController.instance) {
      WebSocketController.instance = new WebSocketController()
    }
    return WebSocketController.instance
  }

  onConnect = (ws: ServerWebSocket<WebSocketData>): void => {
    const connectionId = uniqueId()
    const { profile } = ws.data

    try {
      ws.data = {
        connectionId,
        profile,
      }

      this.connections.set(connectionId, ws)
      ws.send(JSON.stringify({
        type: 'CONNECTED',
      }))
    } catch {
      ws.close()
    }
  }

  onMessage = (ws: ServerWebSocket<WebSocketData>, message: string): void => {
    try {
      const data = JSON.parse(message)

      switch (data.type) {
        case 'CREATE_GAME': {
          const game = this.createGame(data.gameType, data.password)
          ws.data.gameId = game.id
          game.players.set(ws.data.profile.id, ws as ServerWebSocket<WebSocketData>)
          ws.send(JSON.stringify({
            code: game.code,
            gameId: game.id,
            type: 'GAME_CREATED',
          }))
          break
        }

        case 'JOIN_GAME': {
          const game = this.findGameByCode(data.code)
          if (!game) {
            ws.send(JSON.stringify({
              error: 'Game not found',
              type: 'ERROR',
            }))
            return
          }

          if (game.password && game.password !== data.password) {
            ws.send(JSON.stringify({
              error: 'Invalid password',
              type: 'ERROR',
            }))
            return
          }

          ws.data.gameId = game.id
          game.players.set(ws.data.profile.id, ws as ServerWebSocket<WebSocketData>)
          ws.send(JSON.stringify({
            gameId: game.id,
            type: 'GAME_JOINED',
          }))

          // Notify other players
          game.players.forEach((player, id) => {
            if (id !== ws.data.profile.id) {
              player.send(JSON.stringify({
                playerId: ws.data.profile.id,
                profile: ws.data.profile,
                type: 'PLAYER_JOINED',
              }))
            }
          })
          break
        }
      }
    } catch {
      ws.send(JSON.stringify({
        error: 'Invalid message format',
        type: 'ERROR',
      }))
    }
  }

  private createGame(gameType: string, password?: string): GameLobby {
    const game = this.gameFactory.create(gameType, [uniqueId()]) // Start with one player
    const lobby: GameLobby = {
      code: this.generateGameCode(),
      game,
      id: uniqueId(),
      password,
      players: new Map(),
    }

    this.games.set(lobby.id, lobby)
    return lobby
  }

  private findGameByCode(code: string): GameLobby | undefined {
    return Array.from(this.games.values()).find(game => game.code === code)
  }

  private generateGameCode(): string {
    return Math.random().toString().substring(2, 10)
  }
}
