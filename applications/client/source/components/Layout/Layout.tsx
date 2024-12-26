import { observer } from 'mobx-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import './Layout.scss'

interface Props {
  children: React.ReactNode,
}

@observer
export class Layout extends React.Component<Props> {
  static contextType = ApplicationContext
  declare context: React.ContextType<typeof ApplicationContext>

  override render() {
    const { children } = this.props
    const { store } = this.context
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
