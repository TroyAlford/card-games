import * as React from 'react'
import { Group, Rect } from 'react-konva'
import { Card } from '../Card'
import { Menu } from '../Menu'
import { Deck } from '../Deck'

interface PlayerAreaProps {
	y: number
	width: number
	height: number
}

export class PlayerArea extends React.Component<PlayerAreaProps> {
	render() {
		const { y, width, height } = this.props

		return (
			<Group y={y}>
				<Rect width={width} height={height} fill="#2c3e50" opacity={0.1} />
				<Menu x={10} y={height - 60} />
				<Group x={(width - 400) / 2} y={(height - 100) / 2}>
					{/* Hand will go here */}
				</Group>
				<Deck x={width - 70} y={height - 110} />
			</Group>
		)
	}
} 