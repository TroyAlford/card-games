/**
 * Base options required for all card games
 */
export interface GameOptions {
  /**
   * Unique identifier for the game type
   */
  id: string,

  /**
   * Maximum number of players allowed
   */
  maxPlayers: number,

  /**
   * Minimum number of players required
   */
  minPlayers: number,

  /**
   * Display name of the game
   */
  name: string,
}
