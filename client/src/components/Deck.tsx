import * as React from 'react'
import { Group, Rect } from 'react-konva'

interface DeckProps {
	x: number
	y: number
}

export class Deck extends React.Component<DeckProps> {
	render() {
		const { x, y } = this.props
		const CARD_WIDTH = 60
		const CARD_HEIGHT = 100

		// Render a stack of cards effect
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
			</Group>
		)
	}
} 