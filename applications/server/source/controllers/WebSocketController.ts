import { GameFactory } from '@card-games/card-game'
import { uniqueId } from '@card-games/utilities'
import type { ServerWebSocket } from 'bun'
import type { GameLobby } from '../types/GameLobby'

export interface WebSocketData {
  gameId?: string,
  playerId: string,
}

export class WebSocketController {
  private static instance: WebSocketController
  private gameFactory = GameFactory.singleton()
  private games = new Map<string, GameLobby>()

  static singleton(): WebSocketController {
    if (!WebSocketController.instance) {
      WebSocketController.instance = new WebSocketController()
    }
    return WebSocketController.instance
  }

  handleOpen(ws: ServerWebSocket<WebSocketData>): void {
    ws.data = {
      playerId: uniqueId(),
    }
    ws.send(JSON.stringify({
      playerId: ws.data.playerId,
      type: 'CONNECTED',
    }))
  }

  handleMessage(ws: ServerWebSocket<WebSocketData>, message: string): void {
    try {
      const data = JSON.parse(message)

      switch (data.type) {
        case 'CREATE_GAME': {
          const game = this.createGame(data.gameType, data.password)
          ws.data.gameId = game.id
          game.players.set(ws.data.playerId, ws)
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
          game.players.set(ws.data.playerId, ws)
          ws.send(JSON.stringify({
            gameId: game.id,
            type: 'GAME_JOINED',
          }))

          // Notify other players
          game.players.forEach((player, id) => {
            if (id !== ws.data.playerId) {
              player.send(JSON.stringify({
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
