import * as React from 'react'
import { Stage, Layer } from 'react-konva'
import { OpponentArea } from './areas/OpponentArea'
import { CommonArea } from './areas/CommonArea'
import { PlayerArea } from './areas/PlayerArea'
import type { Card } from '@card-games/card-game'

interface GameBoardProps {
	width: number
	height: number
}

interface GameBoardState {
	opponents: Array<{
		id: string
		name: string
		coins: number
		handCount: number
	}>
	standardCards: Card[]
	jokerCards: Card[]
	enchantments: Card[]
	playerCoins: number
	playerHand: Card[]
	playerPlayArea: Card[]  // Cards played on the table
}

export class GameBoard extends React.Component<GameBoardProps, GameBoardState> {
	state: GameBoardState = {
		opponents: [
			{ id: '2', name: 'Player 2', coins: 3, handCount: 5 },
			{ id: '3', name: 'Player 3', coins: 3, handCount: 5 }
		],
		standardCards: [],
		jokerCards: [],
		enchantments: [],
		playerCoins: 3,
		playerHand: [
			// Add some example cards for testing
			{
				id: '1',
				name: 'Test Card 1',
				type: 'hearts',
				baseValue: 5,
				currentValue: 5,
				modifiers: [],
				triggers: [],
				effects: []
			},
			// Add more test cards...
		],
		playerPlayArea: []
	}

	handleCardClick = (card: Card, source: string) => {
		// Implement card buying logic based on source
		const cost = source === 'jokers-deck' ? 2 : source === 'enchantments-deck' ? 3 : 1
		console.log(`Buying ${card.name} from ${source} for ${cost} coins`)
	}

	render() {
		const { width, height } = this.props
		const areaHeight = height / 3

		return (
			<Stage width={width} height={height}>
				<Layer>
					<OpponentArea
						y={0}
						width={width}
						height={areaHeight}
						opponents={this.state.opponents}
					/>
					<CommonArea
						y={areaHeight}
						width={width}
						height={areaHeight}
						standardCards={this.state.standardCards}
						jokerCards={this.state.jokerCards}
						enchantments={this.state.enchantments}
						onCardClick={this.handleCardClick}
					/>
					<PlayerArea
						y={areaHeight * 2}
						width={width}
						height={areaHeight}
						coins={this.state.playerCoins}
						hand={this.state.playerHand}
						playArea={this.state.playerPlayArea}
					/>
				</Layer>
			</Stage>
		)
	}
} 