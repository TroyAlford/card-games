import type { ICard } from './Card'

/**
 * Represents an event that occurs during the game.
 */
export interface GameEvent {
	/** Type of event */
	type: string

	/** Source that triggered the event */
	source: ICard

	/** Target of the event (if any) */
	target?: ICard

	/** Additional event data */
	data?: any

	/** When the event occurred */
	timestamp: number
} 