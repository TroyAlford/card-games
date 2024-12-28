import type { Game } from '@card-games/card-game'
import type { GameDescription } from '@card-games/card-game/source/types/GameDescription'
import type { GameOptions } from '@card-games/card-game/source/types/GameOptions'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

interface GameConstructor<Options extends GameOptions = GameOptions> {
  id: string,
  name: string,
  new(options?: Partial<Options>): Game<Options>,
}

export class GameCatalog {
  static #singleton: GameCatalog
  static singleton(): GameCatalog {
    if (!this.#singleton) {
      this.#singleton = new GameCatalog()
    }
    return this.#singleton
  }

  private games = new Map<string, GameConstructor<GameOptions>>()
  private loadErrors: string[] = []

  async initialize(): Promise<void> {
    this.loadErrors = []

    // Get the workspace root directory
    const workspaceRoot = process.cwd()
    const gamesDir = join(workspaceRoot, '../../games')

    try {
      // Read all directories in the games folder
      const gameDirs = await readdir(gamesDir, { withFileTypes: true })
      const gameModules = gameDirs
        .filter(dir => dir.isDirectory())
        .map(dir => dir.name)

      // Import and register each game
      await Promise.all(gameModules.map(async moduleName => {
        try {
          const module = await import(`@card-games/${moduleName}`)
          if (module.Chaos) {
            this.register(module.Chaos)
          }
        } catch {
          this.loadErrors.push(`Failed to load game module ${moduleName}`)
        }
      }))
    } catch {
      this.loadErrors.push('Failed to initialize game catalog')
      throw new Error('Failed to initialize game catalog')
    }
  }

  register<Options extends GameOptions>(GameClass: GameConstructor<Options>): void {
    if (!GameClass.id) throw new Error('Game constructor must have a static id property')
    if (!GameClass.name) throw new Error('Game constructor must have a static name property')
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
    return game
  }

  getAvailableGames(): GameDescription[] {
    return Array.from(this.games.values()).map(GameClass => ({
      id: GameClass.id,
      maxPlayers: 4, // TODO: Get from game class
      minPlayers: 2, // TODO: Get from game class
      name: GameClass.name,
    }))
  }

  getLoadErrors(): string[] {
    return [...this.loadErrors]
  }
}
