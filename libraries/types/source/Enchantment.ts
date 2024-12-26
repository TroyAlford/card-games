import type { Effect } from './Effect'

/**
 * Represents a persistent effect attached to a card, player, or game state.
 */
export interface Enchantment {
  /** Duration in turns (undefined = permanent) */
  duration?: number,

  /** Effects provided by this enchantment */
  effects: Effect[],

  /** Unique identifier for this enchantment */
  id: string,

  /** Whether the enchantment can be removed */
  removable: boolean,

  /** Source that created this enchantment */
  source: {
    id: string,
    type: 'card' | 'player' | 'game',
  },

  /** Target being enchanted */
  target: {
    id: string,
    type: 'card' | 'player' | 'game',
  },
}
