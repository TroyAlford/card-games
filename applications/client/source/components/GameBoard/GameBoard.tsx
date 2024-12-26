import { PlayArea } from '@card-games/components'
import type * as Type from '@card-games/types'
import React from 'react'
import { Layer, Stage } from 'react-konva'
import './GameBoard.scss'

interface Props {
  gameCode: string,
  gameState: Type.PlayerGameState,
}

export class GameBoard extends React.Component<Props> {
  override render() {
    const { gameCode, gameState } = this.props
    const stageHeight = window.innerHeight - 40 // Subtract footer height

    return (
      <div className="game-board component">
        <Stage className="stage" height={stageHeight} width={window.innerWidth}>
          <Layer>
            {/* Other Players Area (Top 1/3) */}
            <div className="other-players" style={{ height: stageHeight / 3 }}>
              {gameState.otherPlayers.map(player => (
                <PlayArea key={player.id} playArea={player.playArea} />
              ))}
            </div>
            {/* Common Area (Middle 1/3) */}
            <div className="common-area" style={{ height: stageHeight / 3 }}>
              <PlayArea playArea={gameState.commonArea} />
            </div>
            {/* Current Player Area (Bottom 1/3) */}
            <div className="player-area" style={{ height: stageHeight / 3 }}>
              <PlayArea playArea={gameState.player.playArea} />
            </div>
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
