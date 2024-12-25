import type { Modifier } from '@card-games/card-game/source/types/Modifier'
import type { Trigger } from '@card-games/card-game/source/types/Trigger'

export interface CardEffect {
	modifiers?: Modifier[]
	triggers?: Trigger[]
} 