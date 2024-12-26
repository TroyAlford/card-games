import { observer } from 'mobx-react'
import React from 'react'
import { Link } from 'react-router-dom'
import type { ApplicationStore } from '../../stores/ApplicationStore'
import './Layout.scss'

interface Props {
  children: React.ReactNode,
  store: ApplicationStore,
}

@observer
export class Layout extends React.Component<Props> {
  override render() {
    const { children, store } = this.props
    const { connectionStatus, currentGame, displayName } = store

    return (
      <div className="layout">
        <header>
          <div className="user-info">
            <span className="display-name">
              {displayName}
            </span>
            <div className={`connection-status ${connectionStatus}`} />
          </div>
          {currentGame && (
            <div className="game-info">
              <span>Game: </span>
              <Link to={`/game/${currentGame.id}`}>
                {currentGame.name}
              </Link>
            </div>
          )}
        </header>
        <main>
          {children}
        </main>
      </div>
    )
  }
}
