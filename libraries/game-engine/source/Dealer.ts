import type { GameState } from '../../types/source/GameState'
import type { Player } from '../../types/source/Player'
import type { PlayerState } from '../../types/source/PlayerState'
import { STANDARD_COLORS, STANDARD_SUITS } from './types/index'

export abstract class Dealer<T extends GameState = GameState> {
  protected state: T

  constructor() {
    this.state = this.createInitialState()
  }

  protected createInitialState(): T {
    const state: GameState = {
      colors: STANDARD_COLORS,
      currentTurn: 0,
      id: crypto.randomUUID(),
      playAreas: [],
      players: [],
      status: 'waiting',
      suits: STANDARD_SUITS,
      teams: [],
    }
    return state as T
  }

  // Get state visible to a specific player
  public getPlayerState(playerId: string): PlayerState {
    const player = this.state.players.find(p => p.id === playerId)
    if (!player) throw new Error('Player not found')

    const visibleAreas = this.state.playAreas.filter(area => area.type === 'common'
			|| (area.type === 'personal' && area.ownerId === playerId))

    return {
      colors: this.state.colors,
      currentTurn: this.state.currentTurn,
      playerId,
      status: this.state.status,
      suits: this.state.suits,
      visibleAreas,
      visiblePlayers: this.getVisiblePlayers(playerId),
    }
  }

  protected getVisiblePlayers(playerId: string): Player[] {
    // By default, return public info for all players
    return this.state.players.map(player => ({
      id: player.id,
      name: player.name,
      // Ensure non-undefined
      score: player.score || 0,
      teamId: player.teamId || '',      // Ensure non-undefined
    }))
  }

  // Abstract methods to be implemented by specific games
  protected abstract validateEvent(playerId: string, event: any): boolean
  protected abstract handleEvent(playerId: string, event: any): Promise<void>
  protected abstract calculateScores(): Record<string, number>

  // Event handling
  public async processEvent(playerId: string, event: any): Promise<void> {
    if (!this.validateEvent(playerId, event)) {
      throw new Error('Invalid event')
    }

    await this.handleEvent(playerId, event)
    await this.updateScores()
  }

  private async updateScores(): Promise<void> {
    const scores = this.calculateScores()
    this.state.players.forEach(player => {
      player.score = scores[player.id] || 0
    })
  }
}
