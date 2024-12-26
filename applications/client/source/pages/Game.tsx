import { observer } from 'mobx-react'
import * as React from 'react'
import { Navigate } from 'react-router-dom'
import { GameBoard } from '../components/GameBoard/GameBoard'
import { ApplicationContext } from '../contexts/ApplicationContext'
import './Game.scss'

interface Props {
  id?: string,
}

@observer
export class Game extends React.Component<Props> {
  static contextType = ApplicationContext
  declare context: React.ContextType<typeof ApplicationContext>

  override componentDidMount() {
    const { id } = this.props
    if (id) this.context.store.joinGame(id)
  }

  override render() {
    const { id } = this.props
    const { store } = this.context
    const { currentGame } = store

    if (!id?.trim()) return <Navigate to="/lobby" />
    if (!currentGame) {
      return (
        <div className="game page">
          <div className="loading">Loading...</div>
        </div>
      )
    }

    return (
      <div className="game page">
        <GameBoard
          gameCode={id}
          gameState={currentGame}
        />
      </div>
    )
  }
}
