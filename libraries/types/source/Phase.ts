/**
 * Represents the different phases of a card game turn.
 */
export type Phase = 'draw' | 'play' | 'discard' | 'end'

/**
 * Configuration for a game phase.
 */
export interface PhaseConfig {
	/** Phase identifier */
	id: Phase

	/** Display name for the phase */
	name: string

	/** Phase description */
	description: string

	/** Whether the phase can be skipped */
	optional: boolean

	/** Actions allowed during this phase */
	allowedActions: string[]

	/** Maximum duration in seconds (0 = no limit) */
	timeLimit: number
} 