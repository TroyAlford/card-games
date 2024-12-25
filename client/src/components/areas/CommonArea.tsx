import * as React from 'react'
import { Group, Rect } from 'react-konva'

interface CommonAreaProps {
	y: number
	width: number
	height: number
}

export class CommonArea extends React.Component<CommonAreaProps> {
	render() {
		const { y, width, height } = this.props

		return (
			<Group y={y}>
				<Rect width={width} height={height} fill="#27ae60" opacity={0.1} />
				{/* Common/shared area content will go here */}
			</Group>
		)
	}
} 