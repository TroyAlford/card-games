import * as React from 'react'
import { GameStore } from '@card-games/game-engine'

export const StoreContext = React.createContext<GameStore | undefined>(undefined)

interface StoreProviderProps {
	store: GameStore
	children: React.ReactNode
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
