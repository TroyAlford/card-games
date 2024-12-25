import type { Player } from './Player'
import type { Team } from './Team'
import type { PlayArea } from '../../game-engine/source/types/PlayArea'
import type { Suit } from './Suit'
import type { Color } from './Color'

export interface GameState {
	id: string
	players: Player[]
	teams: Team[]
	playAreas: PlayArea[]
	currentTurn: number
	status: 'waiting' | 'active' | 'finished'
	suits: Record<string, Suit>
	colors: Record<string, Color>
} 