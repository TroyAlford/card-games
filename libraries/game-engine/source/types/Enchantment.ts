import type { Effect } from './Effect'

export interface Enchantment {
	id: string
	name: string
	type: 'area' | 'player' | 'card'
	duration?: number | 'permanent'
	condition?: (target: any) => boolean
	effects: Effect[]
} 