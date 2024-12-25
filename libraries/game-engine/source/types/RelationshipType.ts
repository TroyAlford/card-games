export interface RelationshipType {
	type: 'allied' | 'opponent' | 'neutral'
	teamId: string
	playerId?: string
} 