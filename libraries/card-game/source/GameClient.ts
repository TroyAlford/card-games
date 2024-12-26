import type { ICard } from '../../types/source/ICard'
import type { IPlayerView } from '../../types/source/IPlayerView'
import type { ErrorCallback, GameStateCallback } from './types/GameTypes'

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
    this.channel.onmessage = event => {
      const { data, playerId, type } = event.data

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
      playerId: this.playerId,
      type: 'JOIN_GAME',
    })
  }

  public playCards(cards: ICard[]): void {
    this.channel.postMessage({
      data: { cards },
      playerId: this.playerId,
      type: 'PLAY_CARDS',
    })
  }

  public drawCards(sourceId: string): void {
    this.channel.postMessage({
      data: { sourceId },
      playerId: this.playerId,
      type: 'DRAW_CARDS',
    })
  }

  public requestState(): void {
    this.channel.postMessage({
      playerId: this.playerId,
      type: 'REQUEST_STATE',
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
