/**
 * Represents an effect that can be applied to a card, player, or game state.
 */
export interface Effect {
	/** Unique identifier for this effect */
	id: string

	/** Type of effect */
	type: 'instant' | 'continuous' | 'triggered'

	/** Target of the effect (card, player, game) */
	target: {
		type: 'card' | 'player' | 'game'
		id: string
	}

	/** Effect's properties */
	properties: {
		/** Duration in turns (undefined = permanent) */
		duration?: number
		/** Strength or magnitude of the effect */
		power?: number
		/** Additional effect-specific data */
		[key: string]: any
	}

	/** Conditions that must be met for the effect to be active */
	conditions?: {
		type: string
		value: any
	}[]
} 