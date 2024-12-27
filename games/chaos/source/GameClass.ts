import type { Action } from '@card-games/card-game'
import { Game } from '@card-games/card-game'
import { BASIC_DECK } from '@card-games/types'
import { uniqueId } from '@card-games/utilities'
import type { ChaosGameState, ChaosOptions } from './types'

export class GameClass extends Game<ChaosOptions, ChaosGameState> {
  static id = 'chaos'

  public override get initialState(): ChaosGameState {
    return {
      ...super.initialState,
      commonArea: {
        cards: [...BASIC_DECK],
        id: uniqueId(),
        name: 'Common Area',
        type: 'common',
      },
      players: [],
    }
  }

  override getAvailableActions(): Action<ChaosGameState>[] {
    return [{
      execute: (currentState: ChaosGameState) => currentState,
      id: uniqueId(),
      name: 'Pass',
      validate: () => true,
    }]
  }

  override getCurrentPlayerId(): string {
    return this.state.currentPlayerId ?? ''
  }

  initialize(playerIds: string[]): ChaosGameState {
    const state: ChaosGameState = {
      commonArea: {
        cards: [...BASIC_DECK],
        id: uniqueId(),
        name: 'Common Area',
        type: 'common',
      },
      currentPlayerId: playerIds[0] ?? null,
      players: playerIds.map(id => ({
        coins: 4,
        deck: {
          cards: [...BASIC_DECK],
          id: uniqueId(),
          name: `${id}'s Deck`,
        },
        hand: {
          cards: [],
          id: uniqueId(),
          name: `${id}'s Hand`,
        },
        id,
        name: id,
        playArea: {
          cards: [],
          id: uniqueId(),
          name: `${id}'s Play Area`,
          type: 'player',
        },
      })),
    }

    return state
  }

  override action(): void {
    // Find next player
    const currentIndex = this.state.players.findIndex(p => p.id === this.state.currentPlayerId)
    const nextIndex = (currentIndex + 1) % this.state.players.length
    this.state.currentPlayerId = this.state.players[nextIndex]?.id ?? null
  }
}
