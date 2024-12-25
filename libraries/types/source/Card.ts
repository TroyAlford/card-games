import type { Effect } from './CardEffect'
import type { Modifier } from './Modifier'
import type { Trigger } from './Trigger'

export interface Card {
	id: string
	name: string
	type: string
	suit?: string
	rank?: string
	value: number
	base: {
		type: string
		suit?: string
		rank?: string
		value: number
	}
	effects: Effect[]
	modifiers: Modifier[]
	triggers: Trigger[]
	isVisible?: boolean
	isPlayable?: boolean
	isDiscardable?: boolean
	isTargetable?: boolean
	isSelected?: boolean
} 