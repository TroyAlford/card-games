import type { Card } from './Card'
import type { Hand } from './Hand'
import type { PlayArea } from './PlayArea'

export interface PlayerState {
  deck: {
    cards: Card[], // Server knows order, client just knows contents
    id: string,
    name: string,
  },
  hand: Hand,
  id: string,
  name: string,
  playArea: PlayArea,
}

export interface PlayerStatePublic {
  deck: {
    cardCount: number,
    id: string,
    name: string,
  },
  hand: {
    cardCount: number,
    id: string,
    name: string,
  },
  id: string,
  name: string,
  playArea: PlayArea, // Play areas are always public
}
