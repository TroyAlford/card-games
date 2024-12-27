import { GameFactory } from '@card-games/card-game'
import type { ClientMessage, CreateGameMessage, JoinGameMessage } from '@card-games/types'
import { MessageType } from '@card-games/types'
import { uniqueId } from '@card-games/utilities'
import type { ServerWebSocket } from 'bun'
import type { GameLobby } from '../types/GameLobby'
import type { UserProfile } from '../types/UserProfile'

export interface WebSocketData {
  connectionId: string,
  gameId?: string,
  profile: UserProfile,
}

type MessageHandler<T extends ClientMessage> = (
  ws: ServerWebSocket<WebSocketData>,
  message: T,
) => void

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
        profile,
        type: MessageType.Connected,
      }))
    } catch {
      ws.close()
    }
  }

  onMessage = (ws: ServerWebSocket<WebSocketData>, message: string): void => {
    try {
      const data = JSON.parse(message) as ClientMessage
      const handler = this.getMessageHandler(data.type)
      if (handler) {
        handler(ws, data)
      } else {
        ws.send(JSON.stringify({
          error: 'Unknown message type',
          type: MessageType.Error,
        }))
      }
    } catch {
      ws.send(JSON.stringify({
        error: 'Invalid message format',
        type: MessageType.Error,
      }))
    }
  }

  private getMessageHandler(
    type: ClientMessage['type'],
  ): MessageHandler<ClientMessage> | undefined {
    const handlers: Record<ClientMessage['type'], MessageHandler<ClientMessage>> = {
      [MessageType.CreateGame]: this.handleCreateGame as MessageHandler<ClientMessage>,
      [MessageType.JoinGame]: this.handleJoinGame as MessageHandler<ClientMessage>,
    }
    return handlers[type]
  }

  private handleCreateGame: MessageHandler<CreateGameMessage> = (ws, data) => {
    const game = this.createGame(data.gameType, data.password)
    ws.data.gameId = game.id
    game.players.set(ws.data.profile.id, ws)
    ws.send(JSON.stringify({
      code: game.code,
      gameId: game.id,
      type: MessageType.Game,
    }))
  }

  private handleJoinGame: MessageHandler<JoinGameMessage> = (ws, data) => {
    const game = this.findGameByCode(data.code)
    if (!game) {
      ws.send(JSON.stringify({
        error: 'Game not found',
        type: MessageType.Error,
      }))
      return
    }

    if (game.password && game.password !== data.password) {
      ws.send(JSON.stringify({
        error: 'Invalid password',
        type: MessageType.Error,
      }))
      return
    }

    ws.data.gameId = game.id
    game.players.set(ws.data.profile.id, ws)
    ws.send(JSON.stringify({
      code: game.code,
      gameId: game.id,
      type: MessageType.Game,
    }))

    // Broadcast game state to all players
    this.broadcastGameState(game)
  }

  private broadcastGameState(lobby: GameLobby): void {
    lobby.players.forEach(player => {
      const state = lobby.game.getPlayerState(player.data.profile.id)
      player.send(JSON.stringify({
        state,
        type: MessageType.GameState,
      }))
    })
  }

  private createGame(gameType: string, password?: string): GameLobby {
    const game = this.gameFactory.create(gameType, [uniqueId()]) // Start with one player
    const lobby: GameLobby = {
      code: `${uniqueId(6)}`,
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

  private dispose(): void {
    this.connections.forEach(ws => ws.close(1012, 'Server shutting down'))
    this.connections.clear()
    this.games.clear()
  }
}
