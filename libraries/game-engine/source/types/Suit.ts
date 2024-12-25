import type { ReactNode } from 'react'

export interface Suit {
	name: string
	icon: ReactNode
	colorId: string
}

export const STANDARD_SUITS: Record<string, Suit> = {
	hearts: {
		name: 'Hearts',
		icon: '♥',
		colorId: 'red'
	},
	diamonds: {
		name: 'Diamonds',
		icon: '♦',
		colorId: 'red'
	},
	clubs: {
		name: 'Clubs',
		icon: '♣',
		colorId: 'black'
	},
	spades: {
		name: 'Spades',
		icon: '♠',
		colorId: 'black'
	}
} 