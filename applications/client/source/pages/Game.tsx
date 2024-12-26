import type * as Type from '@card-games/types'
import React from 'react'
import { useParams } from 'react-router-dom'
import { GameBoard } from '../components/GameBoard/GameBoard'
import './Game.scss'

interface Props {
  id: string,
}

interface State {
  error: string | null,
  gameState: Type.PlayerGameState | null,
  socket: WebSocket | null,
}

export class Game extends React.Component<Props, State> {
  state: State = {
    error: null,
    gameState: null,
    socket: null,
  }

  override componentDidMount() {
    const socket = new WebSocket('ws://localhost:8080')

    socket.onopen = () => {
      this.setState({ socket })
      socket.send(JSON.stringify({
        code: this.props.id,
        type: 'JOIN_GAME',
      }))
    }

    socket.onmessage = event => {
      const data = JSON.parse(event.data)

      switch (data.type) {
        case 'ERROR':
          this.setState({ error: data.error })
          break

        case 'GAME_JOINED':
        case 'GAME_STATE_UPDATED':
          this.setState({ gameState: data.gameState })
          break
      }
    }
  }

  override render() {
    const { error, gameState } = this.state

    if (error) {
      return (
        <div className="game page">
          <div className="error">
            {error}
          </div>
        </div>
      )
    }

    if (!gameState) {
      return (
        <div className="game page">
          <div className="loading">
            Loading game...
          </div>
        </div>
      )
    }

    return (
      <div className="game page">
        <GameBoard
          gameCode={this.props.id}
          gameState={gameState}
        />
      </div>
    )
  }
}

// Wrapper to get URL parameters
export function GameWithParams() {
  const { id } = useParams<{ id: string }>()
  return <Game id={id ?? ''} />
} 
