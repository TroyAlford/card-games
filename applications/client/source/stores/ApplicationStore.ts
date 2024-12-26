import type * as Type from '@card-games/types'
import { makeAutoObservable } from 'mobx'

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected'

export class ApplicationStore {
  connectionStatus: ConnectionStatus = 'disconnected'
  currentGame: Type.PlayerGameState | null = null
  displayName = 'Player'
  socket: WebSocket | null = null

  constructor() {
    makeAutoObservable(this)
    this.connect()
  }

  private connect() {
    this.connectionStatus = 'connecting'
    const socket = new WebSocket('ws://localhost:8080')

    socket.onopen = () => {
      this.connectionStatus = 'connected'
      this.socket = socket
    }

    socket.onclose = () => {
      this.connectionStatus = 'disconnected'
      this.socket = null
      // Attempt to reconnect after a delay
      setTimeout(() => this.connect(), 5000)
    }

    socket.onmessage = event => {
      const data = JSON.parse(event.data)

      switch (data.type) {
        case 'GAME_JOINED':
        case 'GAME_STATE_UPDATED':
          this.currentGame = data.gameState
          break
      }
    }
  }

  createGame(password?: string) {
    if (!this.socket) return

    this.socket.send(JSON.stringify({
      password,
      type: 'CREATE_GAME',
    }))
  }

  joinGame(code: string, password?: string) {
    if (!this.socket) return

    this.socket.send(JSON.stringify({
      code,
      password,
      type: 'JOIN_GAME',
    }))
  }

  setDisplayName(name: string) {
    this.displayName = name
  }
}
