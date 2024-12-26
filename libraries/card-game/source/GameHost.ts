import type { ICard } from '../../types/source/ICard'
import type { PlayerView } from '../../types/source/PlayerView'
import type { CardGame } from './CardGame'

export class GameHost {
  private readonly game: CardGame
  private readonly channel: BroadcastChannel
  private readonly gameId: string

  constructor(game: CardGame) {
    this.game = game
    this.gameId = crypto.randomUUID()
    this.channel = new BroadcastChannel(`game-${this.gameId}`)
    this.setupMessageHandling()
  }

  private setupMessageHandling(): void {
    this.channel.onmessage = event => {
      const { data, playerId, type } = event.data

      switch (type) {
        case 'JOIN_GAME':
          this.handlePlayerJoin(playerId)
          break
        case 'PLAY_CARDS':
          this.handlePlayCards(playerId, data.cards)
          break
        case 'REQUEST_STATE':
          this.sendPlayerView(playerId)
          break
      }
    }
  }

  private handlePlayerJoin(playerId: string): void {
    // Add player to game if not already present
    if (!this.game.hasPlayer(playerId)) {
      this.game.addPlayer({ id: playerId })
      this.broadcastGameState()
    }
  }

  private async handlePlayCards(playerId: string, cards: ICard[]): Promise<void> {
    try {
      await this.game.playCards(playerId, cards)
      this.broadcastGameState()
    } catch (error) {
      this.sendError(playerId, error instanceof Error ? error.message : 'Unknown error')
    }
  }

  private sendError(playerId: string, message: string): void {
    this.channel.postMessage({
      data: { message },
      playerId,
      type: 'ERROR',
    })
  }

  private sendPlayerView(playerId: string): void {
    const state = this.game.getVisibleState(playerId)
    const currentPlayerId = this.game.getCurrentPlayerId()

    const playerView: PlayerView = {
      canPlay: currentPlayerId === playerId && state.currentPhase === 'play',
      currentPhase: state.currentPhase,
      currentTurn: currentPlayerId || '',
      gameId: this.gameId,
      hand: state.hands[playerId] || [],
      isMyTurn: currentPlayerId === playerId,
      otherPlayers: state.players
        .filter(p => p.id !== playerId)
        .map(p => ({
          handSize: (state.hands[p.id] || []).length,
          id: p.id,
          name: p.name || p.id,
        })),
      playerId,
      status: state.status,
      table: state.table,
      visiblePlayAreas: state.playAreas,
    }

    this.channel.postMessage({
      data: playerView,
      playerId,
      type: 'GAME_STATE',
    })
  }

  private broadcastGameState(): void {
    // Send updated state to all players
    this.game.state.players.forEach(player => {
      this.sendPlayerView(player.id)
    })
  }

  public getGameId(): string {
    return this.gameId
  }

  public startGame(): void {
    this.game.start()
    this.broadcastGameState()
  }

  public destroy(): void {
    this.channel.close()
  }
}
