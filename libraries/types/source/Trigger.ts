import type { GameEvent } from './GameEvent'
import type { ICard } from './ICard'

export interface Trigger {
	condition: (event: GameEvent) => boolean
	execute: (event: GameEvent, card: ICard) => Promise<void>
} 