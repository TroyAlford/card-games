import { observer } from 'mobx-react'
import React from 'react'
import { useParams } from 'react-router-dom'
import { GameBoard } from '../components/GameBoard/GameBoard'
import type { ApplicationStore } from '../stores/ApplicationStore'
import './Game.scss'

interface Props {
  id: string,
  store: ApplicationStore,
}

@observer
export class Game extends React.Component<Props> {
  override componentDidMount() {
    const { id, store } = this.props
    store.joinGame(id)
  }

  override render() {
    const { id, store } = this.props
    const { currentGame } = store

    if (!currentGame) {
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
          gameCode={id}
          gameState={currentGame}
        />
      </div>
    )
  }
}

// Wrapper to get URL parameters
/**
 *
 * @param root0
 * @param root0.store
 */
export function GameWithParams({ store }: { store: ApplicationStore }) {
  const { id } = useParams<{ id: string }>()
  return <Game id={id ?? ''} store={store} />
}
