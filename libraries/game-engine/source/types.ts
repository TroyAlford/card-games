export interface GameState {
	id: string
	players: Player[]
	currentTurn: number
	status: 'waiting' | 'active' | 'complete'
	[key: string]: any
}

export interface Player {
	id: string
	name: string
	resources: Record<string, number>  // Generic resources (coins, etc)
} 