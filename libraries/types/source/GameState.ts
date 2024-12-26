import type { Card } from './Card'
import type { PlayArea } from './PlayArea'
import type { PlayerState } from './PlayerState'

export interface GameState {
  commonArea: PlayArea,
  commonDecks: {
    cards: Card[], // Server knows order
    id: string,
    name: string,
  }[],
  id: string,
  name: string,
  players: PlayerState[],
}
