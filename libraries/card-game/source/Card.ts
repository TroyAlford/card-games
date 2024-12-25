import { makeAutoObservable, computed } from 'mobx'
import type { CardDefinition } from './types/CardDefinition'
import type { ICard } from './types/ICard'
import type { CardEffect } from './types/CardEffect'
import type { Modifier } from './types/Modifier'
import type { Trigger } from './types/Trigger'
import type { GameEvent } from './types/GameEvent'
import type { Enchantment, Effect, PlayArea } from '@card-games/game-engine'
import { GameStore } from '@card-games/game-engine'

export class Card implements ICard {
	protected readonly base: CardDefinition
	public readonly id: string
	public readonly name: string
	public readonly effects: CardEffect[]
	public modifiers: Modifier[] = []
	public triggers: Trigger[] = []
	public enchantments: Enchantment[] = []

	constructor(
		definition: CardDefinition,
		private store: GameStore,
		private playerId?: string
	) {
		this.base = { ...definition }
		this.id = definition.id
		this.name = definition.name
		this.effects = definition.effects ?? []

		makeAutoObservable(this)
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

	@computed
	public get type(): string {
		let type = this.base.type

		// Apply enchantments from all relevant areas
		const relevantAreas = this.store.getRelevantPlayAreas(this.playerId)
		relevantAreas.forEach((area: PlayArea) => {
			area.enchantments.forEach((enchantment: Enchantment) => {
				if (this.shouldApplyEnchantment(enchantment)) {
					type = this.applyEffects(enchantment.effects, 'type', type)
				}
			})
		})

		// Apply card's own enchantments last
		this.enchantments.forEach(enchantment => {
			type = this.applyEffects(enchantment.effects, 'type', type)
		})

		return type
	}

	@computed
	public get value(): number {
		let value = this.base.value

		// Apply modifiers in order
		this.modifiers.forEach(modifier => {
			if (modifier.effect.type === 'value') {
				const result = modifier.effect.value
				if (typeof result === 'number') {
					value = result
				}
			}
		})

		// Apply enchantments from all relevant play areas
		const relevantAreas = this.store.getRelevantPlayAreas(this.playerId)
		relevantAreas.forEach((area: PlayArea) => {
			area.enchantments.forEach((enchantment: Enchantment) => {
				if (this.shouldApplyEnchantment(enchantment)) {
					value = this.applyEffects(enchantment.effects, 'value', value)
				}
			})
		})

		// Apply card's own enchantments last
		this.enchantments.forEach(enchantment => {
			value = this.applyEffects(enchantment.effects, 'value', value)
		})

		return value
	}

	@computed
	public get suit(): string {
		let suit = this.base.suit

		// Apply enchantments from all relevant areas
		const relevantAreas = this.store.getRelevantPlayAreas(this.playerId)
		relevantAreas.forEach((area: PlayArea) => {
			area.enchantments.forEach((enchantment: Enchantment) => {
				if (this.shouldApplyEnchantment(enchantment)) {
					suit = this.applyEffects(enchantment.effects, 'suit', suit)
				}
			})
		})

		// Apply card's own enchantments last
		this.enchantments.forEach(enchantment => {
			suit = this.applyEffects(enchantment.effects, 'suit', suit)
		})

		return suit
	}

	@computed
	public get color(): string | undefined {
		let color = this.base.color

		// If no base color, return undefined
		if (!color) return undefined

		// Apply enchantments from all relevant areas
		const relevantAreas = this.store.getRelevantPlayAreas(this.playerId)
		relevantAreas.forEach((area: PlayArea) => {
			area.enchantments.forEach((enchantment: Enchantment) => {
				if (this.shouldApplyEnchantment(enchantment)) {
					const newColor = this.applyEffects(enchantment.effects, 'color', color)
					color = newColor ?? color
				}
			})
		})

		// Apply card's own enchantments last
		this.enchantments.forEach(enchantment => {
			const newColor = this.applyEffects(enchantment.effects, 'color', color)
			color = newColor ?? color
		})

		return color
	}

	@computed
	public get rank(): string {
		let rank = this.base.rank

		// Apply enchantments from all relevant areas
		const relevantAreas = this.store.getRelevantPlayAreas(this.playerId)
		relevantAreas.forEach((area: PlayArea) => {
			area.enchantments.forEach((enchantment: Enchantment) => {
				if (this.shouldApplyEnchantment(enchantment)) {
					rank = this.applyEffects(enchantment.effects, 'rank', rank)
				}
			})
		})

		// Apply card's own enchantments last
		this.enchantments.forEach(enchantment => {
			rank = this.applyEffects(enchantment.effects, 'rank', rank)
		})

		return rank
	}

	public async handle(event: GameEvent): Promise<void> {
		// Execute all triggers that match the event
		await Promise.all(
			this.triggers
				.filter(trigger => trigger.condition(event))
				.map(trigger => trigger.execute(event, this))
		)
	}

	// Helper method to add enchantments
	public enchant(enchantment: Enchantment): void {
		this.enchantments.push(enchantment)
	}

	// Helper method to remove enchantments
	public disenchant(enchantmentId: string): void {
		this.enchantments = this.enchantments.filter(e => e.id !== enchantmentId)
	}

	private shouldApplyEnchantment(enchantment: Enchantment): boolean {
		if (!enchantment.condition) return true
		return enchantment.condition(this)
	}

	private applyEffects(effects: Effect[], property: string, currentValue: any): any {
		let result = currentValue

		// Sort effects by priority
		const sortedEffects = [...effects]
			.filter(effect => effect.property === property)
			.sort((a, b) => (a.priority || 0) - (b.priority || 0))

		for (const effect of sortedEffects) {
			switch (effect.operation) {
				case 'add':
					if (typeof effect.value === 'number' && typeof result === 'number') {
						result += effect.value
					}
					break
				case 'multiply':
					if (typeof effect.value === 'number' && typeof result === 'number') {
						result *= effect.value
					}
					break
				case 'set':
					result = effect.value
					break
				case 'transform':
					if (typeof effect.value === 'function') {
						result = effect.value(result)
					}
					break
			}
		}

		return result
	}
} 