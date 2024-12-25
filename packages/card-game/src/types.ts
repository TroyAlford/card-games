export interface Card {
	id: string
	suit?: string
	rank?: string | number
	[key: string]: any
}

export type Deck = Card[]
export type Hand = Card[] 