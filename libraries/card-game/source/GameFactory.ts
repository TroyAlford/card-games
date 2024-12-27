import type { Game } from './Game'
import type { GameDescription } from './types/GameDescription'
import type { GameOptions } from './types/GameOptions'

interface GameConstructor<Options extends GameOptions = GameOptions> {
  id: string,
  new(options?: Partial<Options>): Game<Options>,
}

export class GameFactory {
  private static instance: GameFactory
  private games = new Map<string, GameConstructor<GameOptions>>()

  static singleton(): GameFactory {
    if (!GameFactory.instance) {
      GameFactory.instance = new GameFactory()
    }
    return GameFactory.instance
  }

  register<Options extends GameOptions>(GameClass: GameConstructor<Options>): void {
    if (!GameClass.id) throw new Error('Game constructor must have a static id property')
    if (this.games.has(GameClass.id)) {
      throw new Error(`Game with id ${GameClass.id} is already registered`)
    }

    this.games.set(GameClass.id, GameClass as unknown as GameConstructor<GameOptions>)
  }

  create<Options extends GameOptions>(
    gameId: string,
    playerIds: string[],
    options: Partial<Options> = {},
  ): Game<Options> {
    const GameClass = this.games.get(gameId) as GameConstructor<Options>
    if (!GameClass) {
      throw new Error(`Game with id ${gameId} not found`)
    }

    const game = new GameClass(options)
    if (playerIds.length < game.minPlayers) {
      throw new Error(`Game requires at least ${game.minPlayers} players`)
    }

    if (playerIds.length > game.maxPlayers) {
      throw new Error(`Game allows at most ${game.maxPlayers} players`)
    }

    return game
  }

  getAvailableGames(): GameDescription[] {
    return Array.from(this.games.values()).map(GameClass => {
      const game = new GameClass()
      return {
        id: GameClass.id,
        maxPlayers: game.maxPlayers,
        minPlayers: game.minPlayers,
        name: game.name,
      }
    })
  }
}
