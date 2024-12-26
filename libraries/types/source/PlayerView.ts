import type { ICard } from './Card'
import type { PlayArea } from './PlayArea'
import type { Phase } from './Phase'

/**
 * Represents what a player can see of the game state.
 * This is a filtered view based on visibility rules.
 */
export interface PlayerView {
	/** Game this view belongs to */
	gameId: string

	/** Player this view is for */
	playerId: string

	/** Current game status */
	status: string

	/** Current turn's player ID */
	currentTurn: string

	/** Current phase of the turn */
	currentPhase: Phase

	/** Whether it's this player's turn */
	isMyTurn: boolean

	/** Whether this player can play cards */
	canPlay: boolean

	/** Cards in player's hand */
	hand: ICard[]

	/** Cards on the table */
	table: ICard[]

	/** Play areas visible to this player */
	visiblePlayAreas: PlayArea[]

	/** Information about other players */
	otherPlayers: {
		/** Player's unique ID */
		id: string
		/** Player's display name */
		name: string
		/** Number of cards in hand */
		handSize: number
		/** Player's team (if any) */
		team?: string
	}[]
} 