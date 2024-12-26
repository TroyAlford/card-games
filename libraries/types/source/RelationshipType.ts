export interface RelationshipType {
  playerId?: string,
  teamId: string,
  type: 'allied' | 'opponent' | 'neutral',
}
