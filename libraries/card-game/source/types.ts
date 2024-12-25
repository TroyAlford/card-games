import type { Trigger } from '@card-games/game-engine'
import type { Modifier } from './Modifier'

export interface CardDefinition {
	id: string
	name: string
	type: string
	baseValue: number
	effects?: CardEffect[]
}

export interface CardEffect {
	type: string
	triggers?: Trigger[]
	modifiers?: Modifier[]
}

export interface Card extends CardDefinition {
	currentValue: number
	modifiers: Modifier[]
	triggers: Trigger[]
}

export type Deck = Card[]
export type Hand = Card[] 