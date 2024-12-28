import type { PlayerState } from '@card-games/types'

export interface GameState {
  id: string,
  name: string,
  players: PlayerState[],
}
