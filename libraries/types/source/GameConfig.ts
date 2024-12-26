export interface GameConfig {
  maxPlayers: number,
  maxTeams?: number,
  minPlayers: number,
  minTeams?: number,
  playersPerTeam?: number,
  teamMode: 'solo' | 'coop' | 'pvp' | 'ffa',
}
