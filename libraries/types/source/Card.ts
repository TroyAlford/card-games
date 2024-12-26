import type { Effect } from './Effect'
import type { Enchantment } from './Enchantment'
import type { Modifier } from './Modifier'
import type { Trigger } from './Trigger'
import type { Color } from './Color'
import type { Suit } from './Suit'

/**
 * Base interface for a card in any game.
 * This represents the serializable state of a card.
 */
export interface ICard {
	/** Unique identifier for this card instance */
	id: string

	/** Display name of the card */
	name: string

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

	/** Active modifiers affecting this card */
	modifiers: Modifier[]

	/** Active enchantments on this card */
	enchantments: Enchantment[]

	/** Card's effects when played/triggered */
	effects: Effect[]

	/** Event triggers this card responds to */
	triggers: Trigger[]

	/** Whether the card is currently face up */
	faceUp: boolean

	/** Whether the card can be played */
	playable: boolean

	/** Card's current location */
	location: {
		/** Type of area (hand, table, etc) */
		type: string
		/** ID of the area */
		id: string
		/** Owner of the area */
		ownerId?: string
	}
} 