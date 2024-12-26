import type { GameEvent } from './GameEvent'

/**
 * Represents a condition that must be met for a trigger to fire.
 */
export interface TriggerCondition {
	/** Property to check */
	property: string
	/** Value to compare against */
	value: any
	/** Comparison operator */
	operator: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'includes' | 'excludes'
}

/**
 * Represents an effect that occurs when a trigger fires.
 */
export interface TriggerEffect {
	/** Type of effect */
	type: string
	/** Target of the effect */
	target: string
	/** Effect value */
	value: any
}

/**
 * Represents a condition that can trigger effects during the game.
 */
export interface Trigger {
	/** Unique identifier for this trigger */
	id: string

	/** Event type this trigger responds to */
	eventType: string

	/** Additional conditions that must be met */
	conditions?: TriggerCondition[]

	/** Whether this trigger is currently active */
	active: boolean

	/** Number of times this trigger can fire (-1 = infinite) */
	uses: number

	/** Function to check if the trigger should fire */
	shouldTrigger: (event: GameEvent) => boolean
} 