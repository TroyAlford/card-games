/**
 * Represents an effect that can be applied to a card, player, or game state.
 */
export interface Effect {
  /** Conditions that must be met for the effect to be active */
  conditions?: {
    type: string,
    value: any,
  }[],

  /** Unique identifier for this effect */
  id: string,

  /** Effect's properties */
  properties: {
    /** Additional effect-specific data */
    [key: string]: any,
    /** Duration in turns (undefined = permanent) */
    duration?: number,
    /** Strength or magnitude of the effect */
    power?: number,
  },

  /** Target of the effect (card, player, game) */
  target: {
    id: string,
    type: 'card' | 'player' | 'game',
  },

  /** Type of effect */
  type: 'instant' | 'continuous' | 'triggered',
}
