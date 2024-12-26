import type { GameState } from './GameState'
import type { ICard } from './Card'
import type { CardDrawSourceConfig } from './DrawSource'

/**
 * Configuration for a card game.
 */
export interface CardGameConfig {
	/** Draw sources available in the game */
	drawSources: CardDrawSourceConfig[]

	/** Number of cards players start with */
	startingHandSize: number
}

/**
 * State for a card game.
 */
export interface CardGameState extends GameState {
	/** Cards in each draw source */
	drawSources: Record<string, ICard[]>

	/** Cards in each player's hand */
	hands: Record<string, ICard[]>

	/** Cards on the table */
	table: ICard[]

	/** Active effects in the game */
	effects: Record<string, any>
} 