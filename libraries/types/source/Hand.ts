import type { Card } from './Card'

export interface Hand {
  cards: Card[],
  id: string,
  name: string,
}
