import * as React from 'react'
import { Group, Rect } from 'react-konva'
import { Card as CardComponent } from './Card'
import { PlayerStats } from './PlayerStats'

interface OpponentAreaProps {
  height: number,
  opponents: {
    coins: number,
    handCount: number,
    id: string,
    name: string,
  }[],
  width: number,
  y: number,
}

export class OpponentArea extends React.Component<OpponentAreaProps> {
  override render() {
    const { height, opponents, width, y } = this.props
    const spacing = Math.max(width / (opponents.length + 1), 200)

    return (
      <Group y={y}>
        <Rect
          fill="#c0392b"
          height={height}
          opacity={0.1}
          width={width}
        />
        {opponents.map((opponent, i) => {
          const cardSpacing = Math.min(20, spacing / opponent.handCount)
          const handWidth = opponent.handCount * cardSpacing
          const x = spacing * (i + 1)

          return (
            <Group key={opponent.id} x={x} y={height / 2}>
              <PlayerStats coins={opponent.coins} x={0} y={-60} />
              {/* Show face-down cards representing hand size */}
              {Array.from({ length: opponent.handCount }).map((_, j) => (
                <CardComponent
                  key={j}
                  faceDown
                  x={j * cardSpacing - (handWidth / 2)}
                  y={0}
                />
              ))}
            </Group>
          )
        })}
      </Group>
    )
  }
}
