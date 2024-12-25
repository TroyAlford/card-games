import { CardGame, Card, CardDrawSource, CardGameState } from '@card-games/card-game'
import { Player } from '@card-games/game-engine'
import { createStandardDeck, createJokersDeck } from './decks'

export interface ChaosGameConfig {
	players: { id: string; name: string }[]
	standardDisplayCount?: number
	jokerDisplayCount?: number
	startingCoins?: number
	startingHandSize?: number
}

export interface ChaosPlayer extends Player {
	resources: {
		coins: number
	}
}

export interface ChaosGameState extends CardGameState {
	players: ChaosPlayer[]
}

export class ChaosGame extends CardGame {
	static readonly DEFAULT_CONFIG = {
		standardDisplayCount: 5,
		jokerDisplayCount: 3,
		startingCoins: 3,
		startingHandSize: 5
	}

	private readonly gameConfig: Required<ChaosGameConfig>

	constructor(config: ChaosGameConfig) {
		if (config.players.length < 2) {
			throw new Error('Chaos requires at least 2 players')
		}

		const fullConfig = {
			...ChaosGame.DEFAULT_CONFIG,
			...config
		}

		// Initialize base card game
		super({
			drawSources: [
				new CardDrawSource({
					id: 'standard-deck',
					type: 'shared',
					location: 'center',
					cards: createStandardDeck(),
					maxCards: fullConfig.standardDisplayCount
				}),
				new CardDrawSource({
					id: 'jokers-deck',
					type: 'shared',
					location: 'center',
					cards: createJokersDeck(),
					maxCards: fullConfig.jokerDisplayCount
				})
			],
			startingHandSize: fullConfig.startingHandSize
		})

		this.gameConfig = fullConfig
	}

	public override async start(): Promise<void> {
		// Initialize players with starting coins
		this.gameConfig.players.forEach(player => {
			this.addPlayer({
				...player,
				resources: { coins: this.gameConfig.startingCoins },
				score: 0
			})
		})

		await super.start()
	}

	public async buyCard(playerId: string, cardId: string, sourceId: string): Promise<void> {
		const player = this.getPlayer<ChaosPlayer>(playerId)
		const cost = this.getCardCost(sourceId)

		if (!player.resources.coins || player.resources.coins < cost) {
			throw new Error('Not enough coins')
		}

		const source = this.getDrawSource(sourceId)
		const cards = await this.drawCards(source, 1)

		// Update player state
		player.resources.coins -= cost
		await this.addCardsToHand(playerId, cards)

		// Refill display
		await this.refillDisplay(sourceId)
	}

	private getCardCost(sourceId: string): number {
		return sourceId === 'jokers-deck' ? 2 : 1
	}

	private async refillDisplay(sourceId: string): Promise<void> {
		const source = this.getDrawSource(sourceId)
		const maxCards = sourceId === 'jokers-deck'
			? this.gameConfig.jokerDisplayCount
			: this.gameConfig.standardDisplayCount

		await this.refillDrawSource(source, maxCards)
	}

	protected validateMove(playerId: string, cards: Card[]): boolean {
		// Implement Chaos-specific move validation
		// For now, all moves are valid
		return true
	}

	protected calculateScore(): Record<string, number> {
		const scores: Record<string, number> = {}
		for (const player of this.state.players) {
			scores[player.id] = player.score || 0
		}
		return scores
	}

	protected async handleCardEvent(card: Card, event: any): Promise<void> {
		await super.handleCardEvent(card, event)
		// Add Chaos-specific card event handling here
	}
} 