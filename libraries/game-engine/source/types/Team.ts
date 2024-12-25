export interface Team {
	id: string
	name: string
	type: 'human' | 'ai'
	players: string[] // player IDs
} 