import { Game, GameState } from '@card-games/game-engine'
import type { Card, Deck, Hand } from './types'
import { CardDrawSource } from './sources/CardDrawSource'

export interface CardGameConfig {
	drawSources: CardDrawSource[]
	startingHandSize: number
}

export interface CardGameState extends GameState {
	drawSources: Record<string, Deck>
	hands: Record<string, Hand>
	table: Card[]
	effects: Record<string, any>
}

export abstract class CardGame extends Game<CardGameState> {
	protected config: CardGameConfig

	constructor(config: CardGameConfig) {
		super({
			id: crypto.randomUUID(),
			players: [],
			currentTurn: 0,
			status: 'waiting',
			drawSources: {},
			hands: {},
			table: [],
			effects: {}
		})
		this.config = config
	}

	protected initializeGame(): void {
		// Initialize all draw sources
		this.config.drawSources.forEach(source => {
			source.initialize()
			this.state.drawSources[source.id] = []
		})

		// Deal initial hands if needed
		if (this.config.startingHandSize > 0) {
			this.dealInitialHands()
		}
	}

	protected async dealInitialHands(): Promise<void> {
		const playerSources = this.config.drawSources.filter(
			source => source.type === 'personal' && source.location === 'player'
		)

		for (const player of this.state.players) {
			// Find this player's draw source if they have one
			const personalSource = playerSources.find(
				source => source.id.includes(player.id)
			)

			// Draw from either personal or shared source
			const source = personalSource || this.config.drawSources.find(
				source => source.type === 'shared' && source.location === 'center'
			)

			if (source) {
				this.state.hands[player.id] = await source.draw(
					this.config.startingHandSize
				)
			}
		}
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