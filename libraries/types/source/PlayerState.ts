import type { Color } from './Color'
import type { PlayArea } from './PlayArea'
import type { Player } from './Player'
import type { Suit } from './Suit'

export interface PlayerState {
  colors: Record<string, Color>,
  currentTurn: number,
  playerId: string,
  status: 'waiting' | 'active' | 'finished',
  // Public player info
  suits: Record<string, Suit>,
  visibleAreas: PlayArea[],
  // Common areas + player's own areas
  visiblePlayers: Player[],
}
