import type { GameDescription } from '@card-games/card-game/source/types/GameDescription'
import type { ConnectedMessage, ErrorMessage, GameMessage, GameStateMessage, PlayerGameState, ServerMessage, UserProfile } from '@card-games/types'
import { MessageType } from '@card-games/types'
import { fetch } from '@card-games/utilities'
import * as mobx from 'mobx'
import { ConnectionStatus } from '../types/ConnectionStatus'

// Allow direct mutations in observable fields
mobx.configure({ enforceActions: 'never' })

interface CurrentGame {
  id: string,
  name: string,
  state?: PlayerGameState,
}

export class ApplicationStore {
  static #singleton: ApplicationStore
  static singleton() {
    if (!this.#singleton) this.#singleton = new ApplicationStore()
    return this.#singleton
  }

  @mobx.observable availableGames: GameDescription[] = []
  @mobx.observable connectionStatus: ConnectionStatus = ConnectionStatus.Connecting
  @mobx.observable currentGame: CurrentGame | null = null
  @mobx.observable error: string | null = null
  @mobx.observable profile: UserProfile | null = null

  private socket: WebSocket | null = null

  constructor() {
    mobx.makeObservable(this)
    this.connect()
  }

  connect(): void {
    this.socket = new WebSocket(`ws://${window.location.host}/ws`)
    this.connectionStatus = ConnectionStatus.Connecting

    this.socket.onopen = () => {
      this.connectionStatus = ConnectionStatus.Connected
    }

    this.socket.onclose = () => {
      this.connectionStatus = ConnectionStatus.Disconnected
      setTimeout(() => this.connect(), 1_000)
    }

    this.socket.onmessage = (event: MessageEvent): void => {
      try {
        const data = JSON.parse(event.data) as ServerMessage
        switch (data.type) {
          case MessageType.Connected: return this.handleConnected(data)
          case MessageType.Error: return this.handleError(data)
          case MessageType.Game: return this.handleGame(data)
          case MessageType.GameState: return this.handleGameState(data)
          default: return undefined
        }
      } catch {
        // Silently handle message errors
      }
      return undefined
    }
  }

  private handleConnected = (data: ConnectedMessage): void => {
    this.profile = data.profile
  }

  private handleError = (data: ErrorMessage): void => {
    this.error = data.error
  }

  private handleGame = (data: GameMessage): void => {
    this.currentGame = {
      id: data.gameId,
      name: 'Game',
      state: data.state,
    }
  }

  private handleGameState = (data: GameStateMessage): void => {
    if (this.currentGame) {
      this.currentGame.state = data.state
    }
  }

  createGame(gameType: string, password?: string): void {
    this.socket?.send(JSON.stringify({
      gameType,
      password,
      type: MessageType.CreateGame,
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
      type: MessageType.JoinGame,
    }))
  }
}
