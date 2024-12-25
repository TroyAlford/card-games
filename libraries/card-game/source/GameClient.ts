import { ICard } from '../../types/source/ICard'
import { IPlayerView } from '../../types/source/IPlayerView'
import { GameStateCallback, ErrorCallback } from './types/GameTypes'

export class GameClient {
	private readonly channel: BroadcastChannel
	private readonly playerId: string
	private onStateChange?: GameStateCallback
	private onError?: ErrorCallback
	private currentView?: any // Will be PlayerView but avoiding circular dependency

	constructor(gameId: string, playerId: string) {
		this.channel = new BroadcastChannel(`game-${gameId}`)
		this.playerId = playerId
		this.setupMessageHandling()
	}

	private setupMessageHandling(): void {
		this.channel.onmessage = (event) => {
			const { type, playerId, data } = event.data

			// Only process messages intended for this player
			if (playerId && playerId !== this.playerId) return

			switch (type) {
				case 'GAME_STATE':
					if (this.onStateChange) {
						// Dynamically import to avoid circular dependency
						import('./PlayerView').then(({ PlayerView }) => {
							if (!this.currentView) {
								this.currentView = new PlayerView(this, data as IPlayerView)
							} else {
								this.currentView.update(data as IPlayerView)
							}
							this.onStateChange!(this.currentView)
						})
					}
					break
				case 'ERROR':
					if (this.onError) {
						this.onError(data.message)
					}
					break
			}
		}
	}

	public joinGame(): void {
		this.channel.postMessage({
			type: 'JOIN_GAME',
			playerId: this.playerId
		})
	}

	public playCards(cards: ICard[]): void {
		this.channel.postMessage({
			type: 'PLAY_CARDS',
			playerId: this.playerId,
			data: { cards }
		})
	}

	public drawCards(sourceId: string): void {
		this.channel.postMessage({
			type: 'DRAW_CARDS',
			playerId: this.playerId,
			data: { sourceId }
		})
	}

	public requestState(): void {
		this.channel.postMessage({
			type: 'REQUEST_STATE',
			playerId: this.playerId
		})
	}

	public onGameStateChange(callback: GameStateCallback): void {
		this.onStateChange = callback
	}

	public onGameError(callback: ErrorCallback): void {
		this.onError = callback
	}

	public destroy(): void {
		this.channel.close()
	}
} 