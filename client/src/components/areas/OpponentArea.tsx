import * as React from 'react'
import { Group, Rect } from 'react-konva'

interface OpponentAreaProps {
	y: number
	width: number
	height: number
}

export class OpponentArea extends React.Component<OpponentAreaProps> {
	render() {
		const { y, width, height } = this.props

		return (
			<Group y={y}>
				<Rect width={width} height={height} fill="#c0392b" opacity={0.1} />
				{/* Opponent cards will go here */}
			</Group>
		)
	}
} 