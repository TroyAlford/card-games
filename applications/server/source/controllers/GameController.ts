import { GameFactory } from '@card-games/card-game'
import * as Chaos from '@card-games/chaos'

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

  static factory = GameFactory.singleton()
  constructor() {
    GameController.factory.register(Chaos.GameClass)
  }

  async catalog(): Promise<Response> {
    const games = GameController.factory.getAvailableGames()
    return new Response(JSON.stringify(games), { headers })
  }
}
