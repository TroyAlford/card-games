import type { GameStore } from '@card-games/game-engine'
import * as React from 'react'

export const StoreContext = React.createContext<GameStore | undefined>(undefined)

interface StoreProviderProps {
  children: React.ReactNode,
  store: GameStore,
}

export class StoreProvider extends React.Component<StoreProviderProps> {
  override render() {
    return (
      <StoreContext.Provider value={this.props.store}>
        {this.props.children}
      </StoreContext.Provider>
    )
  }
}
