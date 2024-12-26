/**
 * Represents a base event in the game system.
 * This is distinct from GameEvent which is specific to card interactions.
 */
export interface Event {
  /** Additional event data */
  payload?: any,

  /** Player who triggered the event */
  playerId: string,

  /** When the event occurred */
  timestamp: number,

  /** Event type identifier */
  type: string,
}
