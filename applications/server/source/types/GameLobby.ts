import type { Game } from '@card-games/card-game'
import type { ServerWebSocket } from 'bun'
import type { WebSocketData } from '../controllers/WebSocketController'

export interface GameLobby {
  code: string,
  game: Game,
  id: string,
  password?: string,
  players: Map<string, ServerWebSocket<WebSocketData>>,
}
