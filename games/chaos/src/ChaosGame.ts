import { CardGame, CardGameState } from '@card-games/card-game'
import type { Card } from '@card-games/card-game'

interface ChaosGameState extends CardGameState {
	score: Record<string, number>
}

export class ChaosGame extends CardGame {
	protected validateMove(playerId: string, cards: Card[]): boolean {
		// Implement Chaos-specific move validation
		return true
	}

	protected calculateScore(): Record<string, number> {
		// Implement Chaos-specific scoring
		return {}
	}

	public async save(): Promise<void> {
		const data = JSON.stringify(this.state)
		await localStorage.setItem(`chaos-game-${this.state.id}`, data)
	}

	public async load(): Promise<void> {
		const data = await localStorage.getItem(`chaos-game-${this.state.id}`)
		if (data) {
			this.state = JSON.parse(data)
		}
	}
} 