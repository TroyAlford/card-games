export interface CardDefinition {
	id: string
	name: string
	type: string
	baseValue: number
	effects?: CardEffect[]
}

export interface Card extends CardDefinition {
	currentValue: number
	modifiers: Modifier[]
	triggers: Trigger[]
	handleEvent(event: GameEvent): Promise<void>
}

export interface CardEffect {
	type: string
	modifiers?: Modifier[]
	triggers?: Trigger[]
}

export interface Modifier {
	type: string
	effect: {
		type: 'value' | 'attribute'
		apply: (card: Card) => number | void
	}
}

export interface Trigger {
	type: string
	condition: (event: GameEvent) => boolean
	execute: (event: GameEvent, card: Card) => Promise<void>
}

export interface GameEvent {
	type: string
	playerId: string
	timestamp: number
	payload: any
} 