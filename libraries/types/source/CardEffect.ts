import type { Effect } from './Effect'
import type { Modifier } from './Modifier'
import type { Trigger } from './Trigger'

/**
 * Represents an effect specific to cards.
 */
export interface CardEffect extends Effect {
  /** Modifiers this effect applies */
  modifiers?: Modifier[],
  /** Triggers this effect creates */
  triggers?: Trigger[],
}
