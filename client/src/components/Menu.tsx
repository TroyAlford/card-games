import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'

interface MenuProps {
	x: number
	y: number
}

export class Menu extends React.Component<MenuProps> {
	render() {
		const { x, y } = this.props

		return (
			<Group x={x} y={y}>
				<Rect
					width={50}
					height={50}
					fill="#34495e"
					stroke="#2c3e50"
					strokeWidth={1}
					cornerRadius={4}
				/>
				<Text
					x={25}
					y={25}
					text="☰"
					fontSize={24}
					fill="white"
					align="center"
					verticalAlign="middle"
					offsetX={12}
					offsetY={12}
				/>
			</Group>
		)
	}
} 