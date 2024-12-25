import type { Modifier } from './Modifier'
import type { Trigger } from './Trigger'

export interface CardEffect {
	modifiers?: Modifier[]
	triggers?: Trigger[]
} 