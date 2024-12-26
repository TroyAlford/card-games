import type { Card } from './Card'
import type { PlayArea } from './PlayArea'
import type { PlayerState, PlayerStatePublic } from './PlayerState'

export interface PlayerGameState {
  commonArea: PlayArea,
  commonDecks: {
    cards: Card[], // Client knows contents but not order
    id: string,
    name: string,
  }[],
  id: string,
  name: string,
  otherPlayers: PlayerStatePublic[],
  player: PlayerState,
}
