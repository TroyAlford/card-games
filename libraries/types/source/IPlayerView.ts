import { ICard } from './ICard'
import { PlayArea } from '@card-games/game-engine'
import { Phase } from '../Phase'

export interface IPlayerView {
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
		team?: string
	}[]
	status: 'waiting' | 'active' | 'finished'
	visibleDrawSources: {
		id: string
		location: string
		type: 'personal' | 'shared'
		topCard?: ICard
	}[]
	enchantments: {
		cardId?: string
		playerId?: string
		areaId?: string
		effects: any[]
	}[]
} 