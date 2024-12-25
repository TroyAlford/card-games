import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'
import type { Card as CardType } from '@card-games/card-game'

interface CardTooltipProps {
	card: CardType
	x: number
	y: number
}

export class CardTooltip extends React.Component<CardTooltipProps> {
	render() {
		const { card, x, y } = this.props
		const tooltipWidth = 200
		const tooltipHeight = 120

		return (
			<Group x={x} y={y}>
				<Rect
					width={tooltipWidth}
					height={tooltipHeight}
					fill="white"
					stroke="black"
					strokeWidth={1}
					cornerRadius={4}
					opacity={0.9}
				/>
				<Text
					x={10}
					y={10}
					text={`${card.name}\nType: ${card.type}\nValue: ${card.currentValue}`}
					fontSize={14}
				/>
				<Text
					x={10}
					y={60}
					text={`Effects: ${card.effects.map(e => e.type).join(', ')}`}
					fontSize={12}
				/>
			</Group>
		)
	}
} 