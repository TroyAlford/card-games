import type { Color } from './Color'
import type { Effect } from './Effect'
import type { Enchantment } from './Enchantment'
import type { Modifier } from './Modifier'
import type { Suit } from './Suit'
import type { Trigger } from './Trigger'

/**
 * Base interface for a card in any game.
 * This represents the serializable state of a card.
 */
export interface ICard {
  /** Card's base properties */
  base: {
    /** Card's color (if applicable) */
    color?: Color,
    /** Card's cost to play (if applicable) */
    cost?: number,
    /** Card's rank or value */
    rank?: number,
    /** Card's suit (if applicable) */
    suit?: Suit,
  },

  /** Card's effects when played/triggered */
  effects: Effect[],

  /** Active enchantments on this card */
  enchantments: Enchantment[],

  /** Whether the card is currently face up */
  faceUp: boolean,

  /** Unique identifier for this card instance */
  id: string,

  /** Card's current location */
  location: {
    /** ID of the area */
    id: string,
    /** Owner of the area */
    ownerId?: string,
    /** Type of area (hand, table, etc) */
    type: string,
  },

  /** Active modifiers affecting this card */
  modifiers: Modifier[],

  /** Display name of the card */
  name: string,

  /** Whether the card can be played */
  playable: boolean,

  /** Event triggers this card responds to */
  triggers: Trigger[],
}
