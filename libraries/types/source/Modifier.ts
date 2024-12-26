/**
 * Represents a modification effect.
 */
export interface ModifierEffect {
	/** Type of modification */
	type: string
	/** Property being modified */
	property: string
	/** Operation to apply */
	operation: 'add' | 'multiply' | 'set' | 'transform'
	/** Value to use in operation */
	value: number | string | ((current: any) => any)
	/** Priority of this effect */
	priority?: number
}

/**
 * Represents a modification to a card's properties.
 */
export interface Modifier {
	/** Unique identifier for this modifier */
	id: string

	/** Property being modified */
	property: string

	/** Type of modification */
	operation: 'add' | 'multiply' | 'set' | 'transform'

	/** Modification value */
	value: number | string | ((current: any) => any)

	/** Order in which this modifier is applied */
	priority: number

	/** Duration in turns (undefined = permanent) */
	duration?: number

	/** Source of the modification */
	source: {
		type: 'card' | 'enchantment' | 'effect'
		id: string
	}
} 