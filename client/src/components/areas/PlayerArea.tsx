import * as React from 'react'
import { Group, Rect } from 'react-konva'
import { Card } from '../Card'
import { Menu } from '../Menu'
import { Deck } from '../Deck'
import { PlayerStats } from '../PlayerStats'
import type { Card as CardType } from '@card-games/card-game'
import { CARD_WIDTH } from '../Card'

interface PlayerAreaProps {
	y: number
	width: number
	height: number
	coins: number
	hand: CardType[]
	playArea: CardType[]
}

export class PlayerArea extends React.Component<PlayerAreaProps> {
	render() {
		const { y, width, height, coins, hand, playArea } = this.props
		const cardSpacing = Math.min(CARD_WIDTH + 10, (width - 200) / Math.max(hand.length, 1))
		const centerX = width / 2
		const handWidth = hand.length * cardSpacing

		return (
			<Group y={y}>
				<Rect width={width} height={height} fill="#2c3e50" opacity={0.1} />
				<Menu x={10} y={height - 60} />
				<PlayerStats x={10} y={10} coins={coins} />

				<Group x={centerX - (handWidth / 2)} y={20}>
					{playArea.map((card, i) => (
						<Card
							key={card.id}
							card={card}
							x={i * cardSpacing}
							y={0}
						/>
					))}
				</Group>

				<Group x={centerX - (handWidth / 2)} y={height - 120}>
					{hand.map((card, i) => (
						<Card
							key={card.id}
							card={card}
							x={i * cardSpacing}
							y={0}
						/>
					))}
				</Group>
				<Deck x={width - 90} y={height - 110} />
			</Group>
		)
	}
} 