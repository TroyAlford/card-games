import { PlayArea } from '@card-games/components'
import type * as Type from '@card-games/types'
import React from 'react'
import { Group, Layer, Stage } from 'react-konva'
import './GameBoard.scss'

interface Props {
  gameCode: string,
  gameState: Type.PlayerGameState,
}

interface State {
  height: number,
  width: number,
}

export class GameBoard extends React.Component<Props, State> {
  state: State = {
    height: window.innerHeight - 40, // Subtract footer height
    width: window.innerWidth,
  }

  private handleResize = () => {
    this.setState({
      height: window.innerHeight - 40,
      width: window.innerWidth,
    })
  }

  override componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  override componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  override render() {
    const { gameCode, gameState } = this.props
    const { height, width } = this.state
    const sectionHeight = height / 3

    return (
      <div className="game-board component">
        <Stage height={height} width={width}>
          <Layer>
            {/* Other Players Area (Top 1/3) */}
            <Group y={0}>
              {gameState.otherPlayers.map((player, index) => (
                <PlayArea
                  key={player.id}
                  playArea={player.playArea}
                  x={((index + 1) * width) / (gameState.otherPlayers.length + 1)}
                  y={sectionHeight / 2}
                />
              ))}
            </Group>
            {/* Common Area (Middle 1/3) */}
            <Group y={sectionHeight}>
              <PlayArea
                playArea={gameState.commonArea}
                x={width / 2}
                y={sectionHeight / 2}
              />
            </Group>
            {/* Current Player Area (Bottom 1/3) */}
            <Group y={sectionHeight * 2}>
              <PlayArea
                playArea={gameState.player.playArea}
                x={width / 2}
                y={sectionHeight / 2}
              />
            </Group>
          </Layer>
        </Stage>
        <footer className="game-info">
          <span>
            Game Code:
            {gameCode}
          </span>
        </footer>
      </div>
    )
  }
}
