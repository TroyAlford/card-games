import { GameState, Player } from './types'

export abstract class Game<T extends GameState> {
	protected state: T

	constructor(initialState: T) {
		this.state = initialState
	}

	public addPlayer(player: Player): void {
		this.state.players.push(player)
	}

	public removePlayer(playerId: string): void {
		const index = this.state.players.findIndex(p => p.id === playerId)
		if (index !== -1) {
			this.state.players.splice(index, 1)
		}
	}

	public getPlayer(playerId: string): Player | undefined {
		return this.state.players.find(p => p.id === playerId)
	}

	public async start(): Promise<void> {
		if (this.state.status !== 'waiting') {
			throw new Error('Game already started')
		}
		this.state.status = 'active'
		await this.initializeGame()
	}

	public async end(): Promise<void> {
		this.state.status = 'finished'
		await this.save()
	}

	public getState(): T {
		return { ...this.state }
	}

	protected abstract initializeGame(): void | Promise<void>

	public async save(): Promise<void> {
		// Save game state to browser database
		// This would be implemented by the specific storage adapter
		console.log('Saving game state:', this.state)
	}
} 