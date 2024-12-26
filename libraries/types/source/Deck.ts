import type { Card } from './Card'

export interface Deck {
  cards: Card[],
  id: string,
  name: string,
}
