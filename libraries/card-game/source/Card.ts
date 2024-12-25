import type { CardDefinition, Card as ICard, CardEffect } from './types'
import { Modifier } from './Modifier'
import { Trigger } from '@card-games/game-engine'

export class Card implements ICard {
	public readonly id: string
	public readonly name: string
	public readonly type: string
	public readonly baseValue: number
	public readonly effects: CardEffect[]

	public modifiers: Modifier[] = []
	public triggers: Trigger[] = []

	constructor(definition: CardDefinition) {
		this.id = definition.id
		this.name = definition.name
		this.type = definition.type
		this.baseValue = definition.baseValue
		this.effects = definition.effects || []

		this.initialize()
	}

	private initialize(): void {
		this.effects.forEach(effect => {
			if (effect.modifiers) {
				this.modifiers.push(...effect.modifiers)
			}
			if (effect.triggers) {
				this.triggers.push(...effect.triggers)
			}
		})
	}

	public get currentValue(): number {
		let value = this.baseValue
		// Apply modifiers in order
		this.modifiers.forEach(modifier => {
			if (modifier.effect.type === 'value') {
				const oldValue = value
				modifier.effect.apply({ value })
				value = oldValue
			}
		})
		return value
	}

	public async handleEvent(event: any): Promise<void> {
		// Execute all triggers that match the event
		await Promise.all(
			this.triggers.map(trigger => trigger.execute(event, this))
		)
	}
} 