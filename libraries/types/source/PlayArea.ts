import type { Enchantment } from './Enchantment'

export interface PlayArea {
	id: string
	type: 'common' | 'allied' | 'opponent' | 'personal'
	ownerId?: string // player or team ID that owns this area
	enchantments: Enchantment[]
} 