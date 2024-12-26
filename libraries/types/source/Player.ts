/**
 * Represents a player in the game.
 * This is the base interface that all game-specific player types should extend.
 */
export interface Player {
  /** Unique identifier for the player */
  id: string,

  /** Display name for the player */
  name?: string,

  /** Current status of the player */
  status?: 'active' | 'inactive' | 'disconnected',
}
