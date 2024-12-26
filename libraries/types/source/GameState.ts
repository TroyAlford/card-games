import type { Player } from './Player'
import type { Team } from './Team'
import type { PlayArea } from './PlayArea'
import type { Suit } from './Suit'
import type { Color } from './Color'

/**
 * Represents the complete state of a game.
 * This should be JSON serializable for persistence.
 */
export interface GameState {
	/** Unique identifier for this game */
	id: string

	/** Players in the game */
	players: Player[]

	/** Teams in the game (if team-based) */
	teams: Team[]

	/** Play areas on the board */
	playAreas: PlayArea[]

	/** Current turn number */
	currentTurn: number

	/** Game status */
	status: 'waiting' | 'active' | 'paused' | 'complete'

	/** Available suits in the game */
	suits: Suit[]

	/** Available colors in the game */
	colors: Color[]
} 