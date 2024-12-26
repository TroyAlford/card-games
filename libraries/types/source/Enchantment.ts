import type { Effect } from './Effect'

/**
 * Represents a persistent effect attached to a card, player, or game state.
 */
export interface Enchantment {
	/** Unique identifier for this enchantment */
	id: string

	/** Source that created this enchantment */
	source: {
		type: 'card' | 'player' | 'game'
		id: string
	}

	/** Target being enchanted */
	target: {
		type: 'card' | 'player' | 'game'
		id: string
	}

	/** Effects provided by this enchantment */
	effects: Effect[]

	/** Duration in turns (undefined = permanent) */
	duration?: number

	/** Whether the enchantment can be removed */
	removable: boolean
} 