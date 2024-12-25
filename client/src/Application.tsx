import * as React from 'react';
import { GameBoard } from './components/GameBoard';

interface ApplicationState {
	dimensions: {
		width: number
		height: number
	}
}

export class Application extends React.Component<{}, ApplicationState> {
	state = {
		dimensions: {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}

	private updateDimensions = () => {
		this.setState({
			dimensions: {
				width: window.innerWidth,
				height: window.innerHeight
			}
		})
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions)
	}

	render() {
		const { width, height } = this.state.dimensions
		return (
			<div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
				<GameBoard width={width} height={height} />
			</div>
		)
	}
}
