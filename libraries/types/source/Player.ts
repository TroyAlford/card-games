import type { Deck } from './Deck'
import type { PlayArea } from './PlayArea'

export interface Player {
  deck: Deck,
  id: string,
  name: string,
  playArea: PlayArea,
}
