import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'
import { CARD_WIDTH, CARD_HEIGHT } from './Card'

interface DeckProps {
	x: number
	y: number
	label?: string
}

export class Deck extends React.Component<DeckProps> {
	render() {
		const { x, y, label } = this.props

		return (
			<Group x={x} y={y}>
				{[4, 3, 2, 1, 0].map(i => (
					<Rect
						key={i}
						width={CARD_WIDTH}
						height={CARD_HEIGHT}
						fill="white"
						stroke="black"
						strokeWidth={1}
						cornerRadius={6}
						x={i * 0.5}
						y={i * 0.5}
					/>
				))}
				{label && (
					<Text
						x={CARD_WIDTH / 2}
						y={CARD_HEIGHT + 5}
						text={label}
						fontSize={12}
						fill="#2c3e50"
						align="center"
						offsetX={CARD_WIDTH / 4}
					/>
				)}
			</Group>
		)
	}
} 