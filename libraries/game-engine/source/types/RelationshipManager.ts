import type { RelationshipType } from './RelationshipType'

export interface RelationshipManager {
	getRelationship(sourceId: string, targetId: string): RelationshipType
	isAllied(sourceId: string, targetId: string): boolean
	isOpponent(sourceId: string, targetId: string): boolean
} 