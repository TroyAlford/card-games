/**
 * Represents a modification effect.
 */
export interface ModifierEffect {
  /** Operation to apply */
  operation: 'add' | 'multiply' | 'set' | 'transform',
  /** Priority of this effect */
  priority?: number,
  /** Property being modified */
  property: string,
  /** Type of modification */
  type: string,
  /** Value to use in operation */
  value: number | string | ((current: any) => any),
}

/**
 * Represents a modification to a card's properties.
 */
export interface Modifier {
  /** Duration in turns (undefined = permanent) */
  duration?: number,

  /** Unique identifier for this modifier */
  id: string,

  /** Type of modification */
  operation: 'add' | 'multiply' | 'set' | 'transform',

  /** Order in which this modifier is applied */
  priority: number,

  /** Property being modified */
  property: string,

  /** Source of the modification */
  source: {
    id: string,
    type: 'card' | 'enchantment' | 'effect',
  },

  /** Modification value */
  value: number | string | ((current: any) => any),
}
