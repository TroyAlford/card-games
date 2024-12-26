import { observer } from 'mobx-react'
import * as React from 'react'
import { ApplicationContext } from '../contexts/ApplicationContext'
import './Lobby.scss'

interface State {
  code: string,
  error: string | null,
  password: string,
  showJoinGame: boolean,
}

@observer
export class Lobby extends React.Component<object, State> {
  static contextType = ApplicationContext
  declare context: React.ContextType<typeof ApplicationContext>

  state: State = {
    code: '',
    error: null,
    password: '',
    showJoinGame: false,
  }

  private handleCreateGame = () => {
    const { password } = this.state
    const { store } = this.context
    store.createGame(password)
  }

  private handleJoinGame = () => {
    const { code, password } = this.state
    const { store } = this.context
    store.joinGame(code, password)
  }

  override render() {
    const {
      code,
      error,
      password,
      showJoinGame,
    } = this.state

    return (
      <div className="lobby page">
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
