import { GameFactory } from '@card-games/card-game'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

export class GameCatalog {
  static #singleton: GameCatalog
  static singleton(): GameCatalog {
    if (!this.#singleton) {
      this.#singleton = new GameCatalog()
    }
    return this.#singleton
  }

  private gameFactory = GameFactory.singleton()
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
          if (module.GameClass) {
            this.gameFactory.register(module.GameClass)
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

  getLoadErrors(): string[] {
    return [...this.loadErrors]
  }
}
