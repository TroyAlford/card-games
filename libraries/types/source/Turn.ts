import type { Event } from './Event'

/**
 * Represents a turn in the game.
 */
export interface Turn {
  /** Events that occurred during this turn */
  events: Event[],

  /** Current phase of the turn */
  phase: string,

  /** Player whose turn it is */
  playerId: string,

  /** When the turn started */
  startTime: number,
}
