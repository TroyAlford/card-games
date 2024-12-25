import type { ICard } from '@card-games/card-game/source/types/ICard'

export interface GameEvent {
	data?: any
	source: ICard
	target?: ICard
	type: string
} 