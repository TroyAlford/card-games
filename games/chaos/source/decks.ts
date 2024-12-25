import { Card } from '@card-games/card-game'

const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'] as const
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const

export function createStandardDeck(): Card[] {
	const cards: Card[] = []

	for (const suit of SUITS) {
		for (const rank of RANKS) {
			cards.push({
				id: `${rank}-${suit}`,
				suit,
				rank,
				value: getRankValue(rank),
				type: 'standard'
			})
		}
	}

	return cards
}

export function createJokersDeck(): Card[] {
	return [
		{
			id: 'joker-red',
			type: 'joker',
			name: 'Red Joker',
			value: 15
		},
		{
			id: 'joker-black',
			type: 'joker',
			name: 'Black Joker',
			value: 15
		}
	]
}

function getRankValue(rank: string): number {
	switch (rank) {
		case 'A': return 14
		case 'K': return 13
		case 'Q': return 12
		case 'J': return 11
		default: return parseInt(rank, 10)
	}
} 