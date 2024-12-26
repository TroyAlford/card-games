import type { Player } from './Player'
import type { CardGameConfig, CardGameState } from './CardGame'

/**
 * Configuration for a Chaos game.
 */
export interface ChaosGameConfig extends CardGameConfig {
	/** Maximum number of players */
	maxPlayers: number
	/** Whether to allow spectators */
	allowSpectators: boolean
}

/**
 * Player in a Chaos game.
 */
export interface ChaosPlayer extends Player {
	/** Player's current score */
	score: number
	/** Whether player is a spectator */
	isSpectator: boolean
}

/**
 * State for a Chaos game.
 */
export interface ChaosGameState extends CardGameState {
	/** Current round number */
	round: number
	/** Scores for each player */
	scores: Record<string, number>
	/** Active enchantments on the game */
	enchantments: string[]
} 