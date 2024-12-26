import type { CardEffect } from './CardEffect'
import type { Color } from './Color'
import type { Suit } from './Suit'

/**
 * Represents the base definition of a card.
 */
export interface CardDefinition {
	/** Card's name */
	name: string
	/** Card's type */
	type: string
	/** Card's effects */
	effects?: CardEffect[]
	/** Card's base properties */
	base: {
		/** Card's suit (if applicable) */
		suit?: Suit
		/** Card's color (if applicable) */
		color?: Color
		/** Card's rank or value */
		rank?: number
		/** Card's cost to play (if applicable) */
		cost?: number
	}
} 