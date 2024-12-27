import type { Card, PlayerState } from '@card-games/types'

/**
 * Current state of a chaos player
 */
export interface ChaosPlayerState extends PlayerState {
  coins: number,
  deck: {
    cards: Card[],
    id: string,
    name: string,
  },
  hand: {
    cards: Card[],
    id: string,
    name: string,
  },
  id: string,
  name: string,
  playArea: {
    cards: Card[],
    id: string,
    name: string,
    type: 'player',
  },
}
