import type { Card } from './Card'

export interface ModifierEffect {
	type: string
	apply: (card: Card) => void
	unapply: (card: Card) => void
}

export class Modifier {
	public readonly effect: ModifierEffect
	private applied: boolean = false

	constructor(effect: ModifierEffect) {
		this.effect = effect
	}

	public applyTo(card: Card): void {
		if (!this.applied) {
			this.effect.apply(card)
			this.applied = true
		}
	}

	public removeFrom(card: Card): void {
		if (this.applied) {
			this.effect.unapply(card)
			this.applied = false
		}
	}
} 