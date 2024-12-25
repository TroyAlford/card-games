import * as React from 'react'
import { Stage, Layer } from 'react-konva'
import { OpponentArea } from './areas/OpponentArea'
import { CommonArea } from './areas/CommonArea'
import { PlayerArea } from './areas/PlayerArea'

interface GameBoardProps {
	width: number
	height: number
}

export class GameBoard extends React.Component<GameBoardProps> {
	render() {
		const { width, height } = this.props
		const areaHeight = height / 3

		return (
			<Stage width={width} height={height}>
				<Layer>
					<OpponentArea y={0} width={width} height={areaHeight} />
					<CommonArea y={areaHeight} width={width} height={areaHeight} />
					<PlayerArea y={areaHeight * 2} width={width} height={areaHeight} />
				</Layer>
			</Stage>
		)
	}
} 