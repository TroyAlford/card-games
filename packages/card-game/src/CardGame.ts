import { Game, GameState } from '@card-games/game-engine'
import type { Card, Deck, Hand } from './types'

export interface CardGameState extends GameState {
	deck: Deck
	hands: Record<string, Hand>
	table: Card[]
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
} 