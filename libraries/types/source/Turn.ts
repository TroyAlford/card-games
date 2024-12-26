import type { Event } from './Event'

/**
 * Represents a turn in the game.
 */
export interface Turn {
	/** Player whose turn it is */
	playerId: string

	/** Current phase of the turn */
	phase: string

	/** When the turn started */
	startTime: number

	/** Events that occurred during this turn */
	events: Event[]
} 