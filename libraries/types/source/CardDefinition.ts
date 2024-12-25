import type { CardEffect } from '@card-games/card-game/source/types/CardEffect'

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