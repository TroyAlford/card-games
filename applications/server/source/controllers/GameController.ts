import { GameFactory } from '@card-games/card-game'
import * as Chaos from '@card-games/chaos'

const headers = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
}

export class GameController {
  private static instance: GameController
  private factory = GameFactory.singleton()

  static singleton(): GameController {
    if (!GameController.instance) {
      GameController.instance = new GameController()
    }
    return GameController.instance
  }

  constructor() {
    this.factory.register(Chaos.GameClass)
  }

  async getAvailableGames(): Promise<Response> {
    const games = this.factory.getAvailableGames()
    return new Response(JSON.stringify(games), { headers })
  }
}
