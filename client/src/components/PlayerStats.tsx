import * as React from 'react'
import { Group, Text, Circle, Path } from 'react-konva'

interface PlayerStatsProps {
	x: number
	y: number
	coins: number
}

export class PlayerStats extends React.Component<PlayerStatsProps> {
	render() {
		const { x, y, coins } = this.props

		return (
			<Group x={x} y={y}>
				<Circle
					radius={12}
					fill="#f1c40f"
					stroke="#f39c12"
					strokeWidth={1}
				/>
				<Text
					x={0}
					y={0}
					text="$"
					fontSize={16}
					fill="#e67e22"
					align="center"
					verticalAlign="middle"
					offsetX={8}
					offsetY={8}
				/>
				<Text
					x={20}
					y={-8}
					text={coins.toString()}
					fontSize={16}
					fill="#2c3e50"
					fontStyle="bold"
				/>
			</Group>
		)
	}
} 