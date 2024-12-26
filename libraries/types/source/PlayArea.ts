import type { ICard } from './Card'
import type { Enchantment } from './Enchantment'

/**
 * Represents an area on the game board where cards can be played.
 */
export interface PlayArea {
  /** Cards currently in this area */
  cards: ICard[],

  /** Active enchantments on this area */
  enchantments: Enchantment[],

  /** Unique identifier for this area */
  id: string,

  /** Owner of this area (player or team ID) */
  ownerId?: string,

  /** Placement rules */
  placement?: {
    /** Whether cards can be played face down */
    allowFaceDown?: boolean,
    /** Card types allowed in this area */
    allowedTypes?: string[],
    /** Maximum number of cards allowed */
    maxCards?: number,
  },

  /** Type of play area */
  type: 'common' | 'personal' | 'team',

  /** Visibility rules */
  visibility: {
    /** Specific players/teams who can see (if not public) */
    allowedViewers?: string[],
    /** Who can see cards in this area */
    type: 'public' | 'private' | 'team',
  },
}
