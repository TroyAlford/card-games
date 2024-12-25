export interface Player {
	id: string
	name: string
	resources?: Record<string, number>
	score?: number
}

export interface GameState {
	id: string
	players: Player[]
	currentTurn: number
	status: 'waiting' | 'active' | 'finished'
} 