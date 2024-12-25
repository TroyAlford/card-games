import { Game, GameState } from '@card-games/game-engine'
import type { Card, Deck, Hand } from './types'

export interface CardGameState extends GameState {
	deck: Deck
	hands: Record<string, Hand>
	table: Card[]
	effects: Record<string, any>  // Game-specific effects state
}

export abstract class CardGame extends Game<CardGameState> {
	protected setupDeck(): Deck {
		return []
	}

	protected dealCards(): void {
		// Implementation for dealing cards to players
	}

	protected abstract validateMove(playerId: string, cards: Card[]): boolean
	protected abstract calculateScore(): Record<string, number>

	public async playCards(playerId: string, cards: Card[]): Promise<void> {
		if (!this.validateMove(playerId, cards)) {
			throw new Error('Invalid move')
		}

		// Move cards from hand to table
		const playerHand = this.state.hands[playerId]
		cards.forEach(card => {
			const index = playerHand.findIndex(c => c.id === card.id)
			if (index !== -1) {
				playerHand.splice(index, 1)
				this.state.table.push(card)
			}
		})

		// Create and process the card play event
		const event = {
			type: 'CARDS_PLAYED',
			playerId,
			timestamp: Date.now(),
			payload: { cards }
		}

		// Process triggers on all cards in play
		await Promise.all([
			...this.state.table,
			...Object.values(this.state.hands).flat()
		].map(card => card.handleEvent(event)))

		await this.save()
	}
} 