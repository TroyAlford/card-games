import type { GameDescription } from '@card-games/card-game/source/types/GameDescription'
import { makeObservable, observable } from 'mobx'

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected'

interface CurrentGame {
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
  @observable displayName = 'Player'
  @observable error: string | null = null
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
          this.displayName = `Player ${data.playerId}`
          break
        }

        case 'GAME_CREATED':
        case 'GAME_JOINED': {
          this.currentGame = {
            id: data.gameId,
            name: 'Game',
          }
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
