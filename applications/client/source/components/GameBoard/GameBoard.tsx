import { PlayArea } from '@card-games/components'
import React from 'react'
import { Group, Layer, Stage } from 'react-konva'
import { Navigate } from 'react-router'
import { ApplicationContext } from 'source/contexts/ApplicationContext'
import './GameBoard.scss'

interface State {
  height: number,
  width: number,
}

export class GameBoard extends React.Component<{}, State> {
  static contextType = ApplicationContext
  declare context: React.ContextType<typeof ApplicationContext>

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
    const { currentGame } = this.context
    if (!currentGame?.state) return <Navigate to="/lobby" />

    const { commonArea, otherPlayers = [], player: currentPlayer } = currentGame.state
    const { height, width } = this.state
    const sectionHeight = height / 3

    return (
      <div className="game-board component">
        <Stage height={height} width={width}>
          <Layer>
            {/* Other Players Area (Top 1/3) */}
            <Group y={0}>
              {otherPlayers.map((player, index) => (
                <PlayArea
                  key={player.id}
                  playArea={player.playArea}
                  x={((index + 1) * width) / (otherPlayers.length + 1)}
                  y={sectionHeight / 2}
                />
              ))}
            </Group>
            {/* Common Area (Middle 1/3) */}
            {commonArea && (
              <Group y={sectionHeight}>
                <PlayArea
                  playArea={commonArea}
                  x={width / 2}
                  y={sectionHeight / 2}
                />
              </Group>
            )}
            {/* Current Player Area (Bottom 1/3) */}
            <Group y={sectionHeight * 2}>
              <PlayArea
                playArea={currentPlayer?.playArea}
                x={width / 2}
                y={sectionHeight / 2}
              />
            </Group>
          </Layer>
        </Stage>
        <footer className="game-info">
          <span>
            {`Game Code: ${currentGame?.state?.id}`}
          </span>
        </footer>
      </div>
    )
  }
}
