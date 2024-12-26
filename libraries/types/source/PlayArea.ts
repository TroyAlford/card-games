import type { Card } from './Card'

export interface PlayArea {
  cards: Card[],
  id: string,
  name: string,
  type: 'common' | 'player',
}
