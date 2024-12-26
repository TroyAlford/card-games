import { BASIC_SUITS } from './BASIC_SUITS'
import type { Card } from './Card'
import { Rank } from './Rank'

export const BASIC_DECK: Card[] = BASIC_SUITS.flatMap(suit => Object.values(Rank).map(rank => ({
  id: `${suit.id}-${rank}`,
  rank,
  suit: suit.id,
})))
