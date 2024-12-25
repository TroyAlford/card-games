import type { Enchantment, Effect } from '@card-games/game-engine'

export interface CardDefinition {
	id: string
	name: string
	type: string
	baseValue: number
	suit: string
	rank: string
	color?: string
	effects?: CardEffect[]
}

export interface ICard {
	id: string
	name: string
	type: string
	suit: string
	rank: string
	value: number
	color?: string | undefined
	effects: CardEffect[]
	enchantments: Enchantment[]
	handleEvent(event: GameEvent): Promise<void>
	addEnchantment(enchantment: Enchantment): void
	removeEnchantment(enchantmentId: string): void
}

export interface CardEffect {
	modifiers?: Modifier[]
	triggers?: Trigger[]
}

export interface Modifier {
	effect: Effect
}

export interface Trigger {
	condition: (event: GameEvent) => boolean
	execute: (event: GameEvent, card: ICard) => Promise<void>
}

export interface GameEvent {
	type: string
	source: ICard
	target?: ICard
	data?: any
} 