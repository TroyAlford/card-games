import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'
import type { Card as CardType } from '@card-games/card-game'

interface CardProps {
	card: CardType
	x: number
	y: number
	onMouseEnter?: () => void
	onMouseLeave?: () => void
}

const CARD_WIDTH = 60
const CARD_HEIGHT = 100
const CORNER_RADIUS = 6

export class Card extends React.Component<CardProps> {
	private getSuitSymbol(suit: string): string {
		switch (suit.toLowerCase()) {
			case 'hearts': return '♥'
			case 'diamonds': return '♦'
			case 'clubs': return '♣'
			case 'spades': return '♠'
			default: return suit[0]
		}
	}

	render() {
		const { card, x, y, onMouseEnter, onMouseLeave } = this.props
		const suitSymbol = this.getSuitSymbol(card.type)
		const isRed = ['hearts', 'diamonds'].includes(card.type.toLowerCase())

		return (
			<Group
				x={x}
				y={y}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<Rect
					width={CARD_WIDTH}
					height={CARD_HEIGHT}
					fill="white"
					stroke="black"
					strokeWidth={1}
					cornerRadius={CORNER_RADIUS}
				/>
				{/* Top-left value and suit */}
				<Text
					x={5}
					y={5}
					text={`${card.currentValue}\n${suitSymbol}`}
					fontSize={16}
					fill={isRed ? 'red' : 'black'}
				/>
				{/* Center suit */}
				<Text
					x={CARD_WIDTH / 2}
					y={CARD_HEIGHT / 2}
					text={suitSymbol}
					fontSize={24}
					fill={isRed ? 'red' : 'black'}
					offsetX={12}
					offsetY={12}
				/>
				{/* Bottom-right value and suit (inverted) */}
				<Text
					x={CARD_WIDTH - 5}
					y={CARD_HEIGHT - 25}
					text={`${suitSymbol}\n${card.currentValue}`}
					fontSize={16}
					fill={isRed ? 'red' : 'black'}
					align="right"
				/>
			</Group>
		)
	}
} 