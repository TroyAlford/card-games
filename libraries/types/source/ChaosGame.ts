import type { CardGameConfig, CardGameState } from './CardGame'
import type { Player } from './Player'

/**
 * Configuration for a Chaos game.
 */
export interface ChaosGameConfig extends CardGameConfig {
  /** Whether to allow spectators */
  allowSpectators: boolean,
  /** Maximum number of players */
  maxPlayers: number,
}

/**
 * Player in a Chaos game.
 */
export interface ChaosPlayer extends Player {
  /** Whether player is a spectator */
  isSpectator: boolean,
  /** Player's current score */
  score: number,
}

/**
 * State for a Chaos game.
 */
export interface ChaosGameState extends CardGameState {
  /** Active enchantments on the game */
  enchantments: string[],
  /** Current round number */
  round: number,
  /** Scores for each player */
  scores: Record<string, number>,
}
