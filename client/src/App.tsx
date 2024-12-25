import * as React from 'react';
import { Stage, Layer, Text } from 'react-konva';

class App extends React.Component {
	render() {
		return (
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer>
					<Text
						text="Game Client Running"
						x={window.innerWidth / 2}
						y={window.innerHeight / 2}
						offsetX={100}
						offsetY={10}
					/>
				</Layer>
			</Stage>
		);
	}
}

export default App; 