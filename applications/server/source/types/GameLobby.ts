import type * as Type from '@card-games/types'
import type { WebSocket } from 'bun'

export interface GameLobby {
  code: string,
  gameState: Type.GameState,
  id: string,
  password?: string,
  players: Map<string, WebSocket>,
}
