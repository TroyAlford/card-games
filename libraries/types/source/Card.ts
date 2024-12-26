import type { Rank } from './Rank'

export interface Card {
  color?: string,
  id: string,
  rank: Rank,
  suit: string,
}
