import type * as Type from '@card-games/types'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { GameBoard } from './components/GameBoard/GameBoard'
import './styles/global.scss'

// Initial game state for testing
const initialGameState: Type.PlayerGameState = {
  commonArea: {
    cards: [],
    id: 'common',
    name: 'Common Area',
    type: 'common',
  },
  commonDecks: [
    {
      cards: [],
      id: 'main-deck',
      name: 'Main Deck',
    },
  ],
  id: 'game-1',
  name: 'Test Game',
  otherPlayers: [
    {
      deck: {
        cardCount: 0,
        id: 'player2-deck',
        name: 'Player 2 Deck',
      },
      hand: {
        cardCount: 0,
        id: 'player2-hand',
        name: 'Player 2 Hand',
      },
      id: 'player2',
      name: 'Player 2',
      playArea: {
        cards: [],
        id: 'player2-area',
        name: 'Player 2 Area',
        type: 'player',
      },
    },
    {
      deck: {
        cardCount: 0,
        id: 'player3-deck',
        name: 'Player 3 Deck',
      },
      hand: {
        cardCount: 0,
        id: 'player3-hand',
        name: 'Player 3 Hand',
      },
      id: 'player3',
      name: 'Player 3',
      playArea: {
        cards: [],
        id: 'player3-area',
        name: 'Player 3 Area',
        type: 'player',
      },
    },
  ],
  player: {
    deck: {
      cards: [],
      id: 'player1-deck',
      name: 'Player 1 Deck',
    },
    hand: {
      cards: [],
      id: 'player1-hand',
      name: 'Player 1 Hand',
    },
    id: 'player1',
    name: 'Player 1',
    playArea: {
      cards: [],
      id: 'player1-area',
      name: 'Player 1 Area',
      type: 'player',
    },
  },
}

class App extends React.Component {
  override render() {
    return <GameBoard gameState={initialGameState} />
  }
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
} else {
  throw new Error('Root element not found')
}
