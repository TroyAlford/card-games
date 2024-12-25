export interface GameConfig {
	teamMode: 'solo' | 'coop' | 'pvp' | 'ffa'
	minPlayers: number
	maxPlayers: number
	minTeams?: number
	maxTeams?: number
	playersPerTeam?: number
} 