import type { Game } from '@card-games/card-game'
import type { ServerWebSocket } from 'bun'

interface WebSocketData {
  gameId?: string,
  playerId: string,
}

export interface GameLobby {
  code: string,
  game: Game,
  id: string,
  password?: string,
  players: Map<string, ServerWebSocket<WebSocketData>>,
}
