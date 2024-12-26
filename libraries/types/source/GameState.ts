import type { Color } from './Color'
import type { PlayArea } from './PlayArea'
import type { Player } from './Player'
import type { Suit } from './Suit'
import type { Team } from './Team'

/**
 * Represents the complete state of a game.
 * This should be JSON serializable for persistence.
 */
export interface GameState {
  /** Available colors in the game */
  colors: Color[],

  /** Current turn number */
  currentTurn: number,

  /** Unique identifier for this game */
  id: string,

  /** Play areas on the board */
  playAreas: PlayArea[],

  /** Players in the game */
  players: Player[],

  /** Game status */
  status: 'waiting' | 'active' | 'paused' | 'complete',

  /** Available suits in the game */
  suits: Suit[],

  /** Teams in the game (if team-based) */
  teams: Team[],
}
