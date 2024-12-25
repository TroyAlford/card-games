import type { CardEffect } from './CardEffect'

export interface CardDefinition {
	color?: string
	effects?: CardEffect[]
	id: string
	name: string
	rank: string
	suit: string
	type: string
	value: number
} 