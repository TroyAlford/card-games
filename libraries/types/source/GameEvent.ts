import type { ICard } from './Card'

/**
 * Represents an event that occurs during the game.
 */
export interface GameEvent {
  /** Additional event data */
  data?: any,

  /** Source that triggered the event */
  source: ICard,

  /** Target of the event (if any) */
  target?: ICard,

  /** When the event occurred */
  timestamp: number,

  /** Type of event */
  type: string,
}
