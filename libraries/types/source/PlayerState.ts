import type { PlayArea } from './PlayArea'
import type { Player } from './Player'
import type { Suit } from './Suit'
import type { Color } from './Color'

export interface PlayerState {
	playerId: string
	currentTurn: number
	status: 'waiting' | 'active' | 'finished'
	visibleAreas: PlayArea[]  // Common areas + player's own areas
	visiblePlayers: Player[]  // Public player info
	suits: Record<string, Suit>
	colors: Record<string, Color>
} 