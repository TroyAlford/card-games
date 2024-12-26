import type { Enchantment } from './Enchantment'
import type { ICard } from './Card'

/**
 * Represents an area on the game board where cards can be played.
 */
export interface PlayArea {
	/** Unique identifier for this area */
	id: string

	/** Type of play area */
	type: 'common' | 'personal' | 'team'

	/** Owner of this area (player or team ID) */
	ownerId?: string

	/** Cards currently in this area */
	cards: ICard[]

	/** Active enchantments on this area */
	enchantments: Enchantment[]

	/** Visibility rules */
	visibility: {
		/** Who can see cards in this area */
		type: 'public' | 'private' | 'team'
		/** Specific players/teams who can see (if not public) */
		allowedViewers?: string[]
	}

	/** Placement rules */
	placement?: {
		/** Maximum number of cards allowed */
		maxCards?: number
		/** Card types allowed in this area */
		allowedTypes?: string[]
		/** Whether cards can be played face down */
		allowFaceDown?: boolean
	}
} 