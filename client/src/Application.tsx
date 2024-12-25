import * as React from 'react';
import { GameBoard } from './components/GameBoard';

export class Application extends React.Component {
	render() {
		return (
			<div style={{ width: '100vw', height: '100vh' }}>
				<GameBoard
					width={window.innerWidth}
					height={window.innerHeight}
				/>
			</div>
		);
	}
}
