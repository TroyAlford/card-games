import type { GameOptions } from '@card-games/card-game/source/types/GameOptions'

/**
 * Configuration options for a chaos game
 */
export interface ChaosOptions extends GameOptions {
  id: string,
  maxPlayers: number,
  minPlayers: number,
  name: string,
}
