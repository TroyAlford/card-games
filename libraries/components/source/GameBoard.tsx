import { Card } from '@card-games/card-game'
import { GameStore } from '@card-games/game-engine'
import * as React from 'react'
import { Layer, Stage } from 'react-konva'
import { CommonArea } from './CommonArea'
import { OpponentArea } from './OpponentArea'
import { PlayerArea } from './PlayerArea'
import { StoreProvider } from './StoreProvider'

interface GameBoardProps {
  height: number,
  width: number,
}

interface GameBoardState {
  enchantments: Card[],
  jokerCards: Card[],
  opponents: {
    coins: number,
    handCount: number,
    id: string,
    name: string,
  }[],
  playerCoins: number,
  playerHand: Card[],
  playerPlayArea: Card[],
  standardCards: Card[],  // Cards played on the table
}

export class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
  private store: GameStore

  constructor(props: GameBoardProps) {
    super(props)

    // Initialize the game store
    this.store = new GameStore()

    // Initialize standard suits and colors
    this.store.state.status = 'active'

    // Create test cards using the store
    const testCard = new Card({
      effects: [],
      id: '1',
      name: 'Test Card 1',
      rank: '5',
      suit: 'hearts',
      type: 'standard',
      value: 5,
    }, this.store)

    this.state = {
      enchantments: [],
      jokerCards: [],
      opponents: [
        { coins: 3, handCount: 5, id: '2', name: 'Player 2' },
        { coins: 3, handCount: 5, id: '3', name: 'Player 3' },
      ],
      playerCoins: 3,
      playerHand: [testCard],
      playerPlayArea: [],
      standardCards: [],
    }
  }

  handleCardClick = (card: Card, source: string) => {
    // Implement card buying logic based on source
    const cost = source === 'jokers-deck' ? 2 : source === 'enchantments-deck' ? 3 : 1
    console.log(`Buying ${card.name} from ${source} for ${cost} coins`)
  }

  override render() {
    const { height, width } = this.props
    const areaHeight = height / 3

    return (
      <StoreProvider store={this.store}>
        <Stage height={height} width={width}>
          <Layer>
            <OpponentArea
              height={areaHeight}
              opponents={this.state.opponents}
              width={width}
              y={0}
            />
            <CommonArea
              enchantments={this.state.enchantments}
              height={areaHeight}
              jokerCards={this.state.jokerCards}
              standardCards={this.state.standardCards}
              width={width}
              y={areaHeight}
              onCardClick={this.handleCardClick}
            />
            <PlayerArea
              coins={this.state.playerCoins}
              hand={this.state.playerHand}
              height={areaHeight}
              playArea={this.state.playerPlayArea}
              width={width}
              y={areaHeight * 2}
            />
          </Layer>
        </Stage>
      </StoreProvider>
    )
  }
}
