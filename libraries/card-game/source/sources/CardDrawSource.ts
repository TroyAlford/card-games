import { DrawSource, DrawSourceConfig } from '@card-games/game-engine'
import type { Card, Deck } from '../types'

export class CardDrawSource extends DrawSource {
	protected cards: Deck = []

	constructor(config: DrawSourceConfig & { cards?: Card[] }) {
		super(config)
		if (config.cards) {
			this.cards = [...config.cards]
		}
	}

	initialize(): void {
		this.shuffle()
	}

	async draw(count: number = 1): Promise<Card[]> {
		return this.cards.splice(0, count)
	}

	shuffle(): void {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
		}
	}
} 