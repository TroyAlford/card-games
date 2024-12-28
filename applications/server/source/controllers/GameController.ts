import { Chaos } from '@card-games/chaos'
import { GameCatalog } from '../GameCatalog'

const headers = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
}

export class GameController {
  static #singleton: GameController
  static singleton(): GameController {
    if (!this.#singleton) this.#singleton = new GameController()
    return this.#singleton
  }

  private gameCatalog = GameCatalog.singleton()

  constructor() {
    this.gameCatalog.register(Chaos)
  }

  async getAvailableGames(): Promise<Response> {
    const games = this.gameCatalog.getAvailableGames()
    return Promise.resolve(new Response(JSON.stringify(games), { headers }))
  }
}
