import type { Card, GameState } from '@card-games/types'
import type { ChaosPlayerState } from './ChaosPlayerState'

/** Current state of a chaos game */
export interface ChaosGameState extends GameState {
  commonArea: {
    cards: Card[],
    id: string,
    name: string,
    type: 'common',
  },
  currentPlayerId: string | null,
  players: ChaosPlayerState[],
}
