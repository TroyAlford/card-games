import type { Enchantment } from '@card-games/game-engine'
import type { CardEffect } from './CardEffect'
import type { GameEvent } from './GameEvent'

export interface ICard {
	color?: string | undefined
	disenchant(enchantmentId: string): void
	effects: CardEffect[]
	enchant(enchantment: Enchantment): void
	enchantments: Enchantment[]
	handle(event: GameEvent): Promise<void>
	id: string
	name: string
	rank: string
	suit: string
	type: string
	value: number
} 