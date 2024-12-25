import type { Event } from './Event'

export interface Turn {
	playerId: string
	events: Event[]
	startTime: number
	endTime?: number
} 