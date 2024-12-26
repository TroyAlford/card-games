import { PlayArea } from '@card-games/components'
import type * as Type from '@card-games/types'
import React from 'react'
import { Layer, Stage } from 'react-konva'
import './GameBoard.scss'

interface Props {
  gameState: Type.PlayerGameState,
}

export class GameBoard extends React.Component<Props> {
  override render() {
    const { gameState } = this.props

    return (
      <div className="game-board component">
        <Stage className="stage" height={window.innerHeight} width={window.innerWidth}>
          <Layer>
            {/* Common Area */}
            <PlayArea playArea={gameState.commonArea} />
            {/* Current Player Area */}
            <PlayArea playArea={gameState.player.playArea} />
            {/* Other Players Areas */}
            {gameState.otherPlayers.map(player => (
              <PlayArea key={player.id} playArea={player.playArea} />
            ))}
          </Layer>
        </Stage>
      </div>
    )
  }
}
