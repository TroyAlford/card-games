import type { ReactNode } from 'react'

export interface Player {
	id: string
	name: string
	teamId?: string
	resources?: Record<string, number>
	score?: number
}

export interface Team {
	id: string
	name: string
	type: 'human' | 'ai'
	players: string[] // player IDs
}

export interface PlayArea {
	id: string
	type: 'common' | 'allied' | 'opponent' | 'personal'
	ownerId?: string // player or team ID that owns this area
	enchantments: Enchantment[]
}

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

export interface GameConfig {
	teamMode: 'solo' | 'coop' | 'pvp' | 'ffa'
	minPlayers: number
	maxPlayers: number
	minTeams?: number
	maxTeams?: number
	playersPerTeam?: number
}

export interface Enchantment {
	id: string
	name: string
	type: 'area' | 'player' | 'card'
	duration?: number | 'permanent'
	condition?: (target: any) => boolean
	effects: Effect[]
}

export interface Effect {
	type: string
	property: string
	operation: 'add' | 'multiply' | 'set' | 'transform'
	value: number | string | ((current: any) => any)
	priority?: number // Higher priority effects apply last
}

export interface RelationshipType {
	type: 'allied' | 'opponent' | 'neutral'
	teamId: string
	playerId?: string
}

export interface RelationshipManager {
	getRelationship(sourceId: string, targetId: string): RelationshipType
	isAllied(sourceId: string, targetId: string): boolean
	isOpponent(sourceId: string, targetId: string): boolean
}

export interface Color {
	name: string
	hex: string
}

export interface Suit {
	name: string
	icon: ReactNode
	colorId: string
}

export const STANDARD_COLORS: Record<string, Color> = {
	red: { name: 'Red', hex: '#ff0000' },
	black: { name: 'Black', hex: '#000000' }
}

export const STANDARD_SUITS: Record<string, Suit> = {
	hearts: {
		name: 'Hearts',
		icon: '♥',
		colorId: 'red'
	},
	diamonds: {
		name: 'Diamonds',
		icon: '♦',
		colorId: 'red'
	},
	clubs: {
		name: 'Clubs',
		icon: '♣',
		colorId: 'black'
	},
	spades: {
		name: 'Spades',
		icon: '♠',
		colorId: 'black'
	}
} 