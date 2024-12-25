import { CardDefinition, Card as ICard, CardEffect, Modifier, Trigger, GameEvent } from './types'

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
				const result = modifier.effect.apply(this)
				if (typeof result === 'number') {
					value = result
				}
			}
		})
		return value
	}

	public async handleEvent(event: GameEvent): Promise<void> {
		// Execute all triggers that match the event
		await Promise.all(
			this.triggers
				.filter(trigger => trigger.condition(event))
				.map(trigger => trigger.execute(event, this))
		)
	}
} 