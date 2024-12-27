import type { GameDescription } from '@card-games/card-game/source/types/GameDescription'
import type { PlayerGameState } from '@card-games/types'
import { fetch } from '@card-games/utilities'
import { makeObservable, observable } from 'mobx'

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected'

interface CurrentGame {
  id: string,
  name: string,
  state?: PlayerGameState,
}

interface UserProfile {
  id: string,
  name: string,
}

export class ApplicationStore {
  static #singleton: ApplicationStore
  static singleton() {
    if (!this.#singleton) this.#singleton = new ApplicationStore()
    return this.#singleton
  }

  @observable availableGames: GameDescription[] = []
  @observable connectionStatus: ConnectionStatus = 'connecting'
  @observable currentGame: CurrentGame | null = null
  @observable error: string | null = null
  @observable profile: UserProfile | null = null

  private socket: WebSocket | null = null

  constructor() {
    makeObservable(this)
    this.connect()
  }

  connect(): void {
    this.socket = new WebSocket(`ws://${window.location.host}/ws`)
    this.connectionStatus = 'connecting'

    this.socket.onopen = () => {
      this.connectionStatus = 'connected'
    }

    this.socket.onclose = () => {
      this.connectionStatus = 'disconnected'
      setTimeout(() => this.connect(), 1000)
    }

    this.socket.onmessage = event => {
      const data = JSON.parse(event.data)

      switch (data.type) {
        case 'CONNECTED': {
          this.profile = data.profile
          break
        }

        case 'GAME_CREATED':
        case 'GAME_JOINED': {
          this.currentGame = {
            id: data.gameId,
            name: 'Game',
            state: data.gameState,
          }
          break
        }

        case 'GAME_STATE': {
          if (this.currentGame) this.currentGame.state = data.gameState
          break
        }

        case 'ERROR': {
          this.error = data.error
          break
        }
      }
    }
  }

  createGame(gameType: string, password?: string): void {
    this.socket?.send(JSON.stringify({
      gameType,
      password,
      type: 'CREATE_GAME',
    }))
  }

  async getAvailableGames(): Promise<void> {
    try {
      const response = await fetch('/api/games')
      if (!response.ok) throw new Error('Failed to fetch games')
      const games = await response.json()
      this.availableGames = games
      this.error = null
    } catch {
      this.error = 'Failed to fetch available games'
      this.availableGames = []
    }
  }

  joinGame(code: string, password?: string): void {
    this.socket?.send(JSON.stringify({
      code,
      password,
      type: 'JOIN_GAME',
    }))
  }
}
