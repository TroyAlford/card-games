import type { ReactNode } from 'react'

export interface Suit {
  colorId: string,
  icon: ReactNode,
  name: string,
}

export const STANDARD_SUITS: Record<string, Suit> = {
  clubs: {
    colorId: 'black',
    icon: '♣',
    name: 'Clubs',
  },
  diamonds: {
    colorId: 'red',
    icon: '♦',
    name: 'Diamonds',
  },
  hearts: {
    colorId: 'red',
    icon: '♥',
    name: 'Hearts',
  },
  spades: {
    colorId: 'black',
    icon: '♠',
    name: 'Spades',
  },
}
