import * as React from 'react'
import { Group, Rect } from 'react-konva'
import { PlayerStats } from '../PlayerStats'
import { Card as CardComponent } from '../Card'

interface OpponentAreaProps {
	y: number
	width: number
	height: number
	opponents: Array<{
		id: string
		name: string
		coins: number
		handCount: number
	}>
}

export class OpponentArea extends React.Component<OpponentAreaProps> {
	override render() {
		const { y, width, height, opponents } = this.props
		const spacing = Math.max(width / (opponents.length + 1), 200)

		return (
			<Group y={y}>
				<Rect width={width} height={height} fill="#c0392b" opacity={0.1} />
				{opponents.map((opponent, i) => {
					const cardSpacing = Math.min(20, spacing / opponent.handCount)
					const handWidth = opponent.handCount * cardSpacing
					const x = spacing * (i + 1)

					return (
						<Group key={opponent.id} x={x} y={height / 2}>
							<PlayerStats x={0} y={-60} coins={opponent.coins} />
							{/* Show face-down cards representing hand size */}
							{Array.from({ length: opponent.handCount }).map((_, j) => (
								<CardComponent
									key={j}
									x={j * cardSpacing - (handWidth / 2)}
									y={0}
									faceDown
								/>
							))}
						</Group>
					)
				})}
			</Group>
		)
	}
} 