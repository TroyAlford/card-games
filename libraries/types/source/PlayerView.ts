import { ICard } from './ICard'
import { PlayArea } from '@card-games/game-engine'
import { Phase } from '../Phase'

export interface PlayerView {
	gameId: string
	playerId: string
	currentTurn: string
	currentPhase: Phase
	hand: ICard[]
	table: ICard[]
	visiblePlayAreas: PlayArea[]
	isMyTurn: boolean
	canPlay: boolean
	otherPlayers: {
		id: string
		handSize: number
		name: string
	}[]
	status: 'waiting' | 'active' | 'finished'
} 