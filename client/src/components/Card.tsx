import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'
import type { Card as CardType } from '@card-games/card-game'

export const CARD_WIDTH = 71
export const CARD_HEIGHT = 100
const CORNER_RADIUS = 6

interface CardProps {
	card?: CardType
	x: number
	y: number
	faceDown?: boolean
	onMouseEnter?: () => void
	onMouseLeave?: () => void
	onClick?: () => void
}

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

	private isRed(type: string): boolean {
		return ['hearts', 'diamonds'].includes(type.toLowerCase())
	}

	render() {
		const { card, x, y, faceDown, onMouseEnter, onMouseLeave, onClick } = this.props

		return (
			<Group
				x={x}
				y={y}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={onClick}
			>
				<Rect
					width={CARD_WIDTH}
					height={CARD_HEIGHT}
					fill={faceDown ? '#34495e' : 'white'}
					stroke="black"
					strokeWidth={1}
					cornerRadius={CORNER_RADIUS}
				/>
				{!faceDown && card && (
					<Text
						x={6}
						y={6}
						text={`${card.currentValue}\n${this.getSuitSymbol(card.type)}`}
						fontSize={16}
						fill={this.isRed(card.type) ? 'red' : 'black'}
						lineHeight={1.2}
					/>
				)}
			</Group>
		)
	}
} 