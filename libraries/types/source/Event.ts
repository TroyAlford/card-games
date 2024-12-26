/**
 * Represents a base event in the game system.
 * This is distinct from GameEvent which is specific to card interactions.
 */
export interface Event {
	/** Event type identifier */
	type: string

	/** Player who triggered the event */
	playerId: string

	/** When the event occurred */
	timestamp: number

	/** Additional event data */
	payload?: any
} 