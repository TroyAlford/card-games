/**
 * Represents a team in the game.
 */
export interface Team {
  /** Unique identifier for this team */
  id: string,

  /** Display name for the team */
  name: string,

  /** Player IDs in this team */
  players: string[],

  /** Team-specific properties */
  properties?: {
    /** Additional team data */
    [key: string]: any,
    /** Team color */
    color?: string,
    /** Team icon */
    icon?: string,
  },

  /** Type of team */
  type: 'human' | 'ai',
}
