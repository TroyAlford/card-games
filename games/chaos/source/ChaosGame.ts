import { CardGame } from '@card-games/card-game'
import { CardDrawSource } from '@card-games/card-game/sources'
import { createStandardDeck, createJokersDeck } from './decks'

export interface ChaosPlayer {
	id: string
	name: string
	coins: number
	score: number
}

export class ChaosGame extends CardGame {
	static readonly STARTING_COINS = 3
	static readonly STANDARD_DISPLAY_COUNT = 5
	static readonly JOKER_DISPLAY_COUNT = 3

	constructor(players: { id: string; name: string }[]) {
		if (players.length < 2) {
			throw new Error('Chaos requires at least 2 players')
		}

		super({
			drawSources: [
				// Standard cards in center
				new CardDrawSource({
					id: 'standard-deck',
					type: 'shared',
					location: 'center',
					cards: createStandardDeck(),
					maxCards: ChaosGame.STANDARD_DISPLAY_COUNT
				}),
				// Jokers deck in center
				new CardDrawSource({
					id: 'jokers-deck',
					type: 'shared',
					location: 'center',
					cards: createJokersDeck(),
					maxCards: ChaosGame.JOKER_DISPLAY_COUNT
				})
			],
			startingHandSize: 5
		})

		// Initialize players with starting coins
		this.state.players = players.map(player => ({
			...player,
			resources: { coins: ChaosGame.STARTING_COINS }
		}))
	}

	protected validateMove(playerId: string, cards: Card[]): boolean {
		// Implement Chaos-specific move validation
		return true
	}

	public async buyCard(playerId: string, cardId: string, sourceId: string): Promise<void> {
		const player = this.state.players.find(p => p.id === playerId)
		if (!player) throw new Error('Player not found')

		const cost = sourceId === 'jokers-deck' ? 2 : 1 // Jokers cost more
		if (player.resources.coins < cost) {
			throw new Error('Not enough coins')
		}

		// Find the card in the display
		const source = this.config.drawSources.find(s => s.id === sourceId)
		if (!source) throw new Error('Invalid source')

		// Add card to player's hand and deduct coins
		const cards = await source.draw(1)
		if (cards.length === 0) throw new Error('No cards available')

		player.resources.coins -= cost
		this.state.hands[playerId].push(...cards)

		// Refill the display
		const maxCards = source.id === 'jokers-deck'
			? ChaosGame.JOKER_DISPLAY_COUNT
			: ChaosGame.STANDARD_DISPLAY_COUNT

		while (this.state.drawSources[source.id].length < maxCards) {
			const newCards = await source.draw(1)
			if (newCards.length === 0) break
			this.state.drawSources[source.id].push(...newCards)
		}

		await this.save()
	}
} 