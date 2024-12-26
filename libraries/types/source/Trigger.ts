import type { GameEvent } from './GameEvent'

/**
 * Represents a condition that must be met for a trigger to fire.
 */
export interface TriggerCondition {
  /** Comparison operator */
  operator: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'includes' | 'excludes',
  /** Property to check */
  property: string,
  /** Value to compare against */
  value: any,
}

/**
 * Represents an effect that occurs when a trigger fires.
 */
export interface TriggerEffect {
  /** Target of the effect */
  target: string,
  /** Type of effect */
  type: string,
  /** Effect value */
  value: any,
}

/**
 * Represents a condition that can trigger effects during the game.
 */
export interface Trigger {
  /** Whether this trigger is currently active */
  active: boolean,

  /** Additional conditions that must be met */
  conditions?: TriggerCondition[],

  /** Event type this trigger responds to */
  eventType: string,

  /** Unique identifier for this trigger */
  id: string,

  /** Function to check if the trigger should fire */
  shouldTrigger: (event: GameEvent) => boolean,

  /** Number of times this trigger can fire (-1 = infinite) */
  uses: number,
}
