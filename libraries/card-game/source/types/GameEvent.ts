import type { ICard } from './ICard'

export interface GameEvent {
	data?: any
	source: ICard
	target?: ICard
	type: string
} 