import type * as Type from '@card-games/types'
import React from 'react'
import './GameLobby.scss'

interface Props {
  onGameStart: (gameState: Type.PlayerGameState) => void,
}

interface State {
  code: string,
  error: string | null,
  gameCode: string | null,
  password: string,
  showJoinGame: boolean,
  socket: WebSocket | null,
}

export class GameLobby extends React.Component<Props, State> {
  state: State = {
    code: '',
    error: null,
    gameCode: null,
    password: '',
    showJoinGame: false,
    socket: null,
  }

  override componentDidMount() {
    const socket = new WebSocket('ws://localhost:8080')

    socket.onopen = () => {
      this.setState({ socket })
    }

    socket.onmessage = event => {
      const data = JSON.parse(event.data)

      switch (data.type) {
        case 'GAME_CREATED':
          this.setState({ gameCode: data.code })
          break

        case 'ERROR':
          this.setState({ error: data.error })
          break

        case 'GAME_JOINED':
          this.props.onGameStart(data.gameState)
          break
      }
    }
  }

  private handleCreateGame = () => {
    const { password, socket } = this.state
    if (!socket) return

    socket.send(JSON.stringify({
      password,
      type: 'CREATE_GAME',
    }))
  }

  private handleJoinGame = () => {
    const { code, password, socket } = this.state
    if (!socket) return

    socket.send(JSON.stringify({
      code,
      password,
      type: 'JOIN_GAME',
    }))
  }

  override render() {
    const {
      code,
      error,
      gameCode,
      password,
      showJoinGame,
    } = this.state

    if (gameCode) {
      return (
        <div className="game-lobby component">
          <h2>Game Created!</h2>
          <p>Share this code with other players:</p>
          <div className="code">
            {gameCode}
          </div>
        </div>
      )
    }

    return (
      <div className="game-lobby component">
        <h1>Card Games</h1>
        {error && (
          <div className="error">
            {error}
          </div>
        )}
        {showJoinGame ? (
          <div className="join-game">
            <h2>Join Game</h2>
            <input
              placeholder="Enter game code"
              type="text"
              value={code}
              onChange={e => this.setState({ code: e.target.value })}
            />
            <input
              placeholder="Enter password (if required)"
              type="password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <button onClick={this.handleJoinGame}>Join Game</button>
            <button onClick={() => this.setState({ showJoinGame: false })}>
              Back
            </button>
          </div>
        ) : (
          <div className="create-game">
            <h2>Create Game</h2>
            <input
              placeholder="Enter password (optional)"
              type="password"
              value={password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <button onClick={this.handleCreateGame}>Create Game</button>
            <button onClick={() => this.setState({ showJoinGame: true })}>
              Join Existing Game
            </button>
          </div>
        )}
      </div>
    )
  }
}
