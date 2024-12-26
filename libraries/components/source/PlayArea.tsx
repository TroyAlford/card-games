import type * as Type from '@card-games/types'
import React from 'react'
import { Group, Rect, Text } from 'react-konva'

interface Props {
  playArea: Type.PlayArea,
  x?: number,
  y?: number,
}

export class PlayArea extends React.Component<Props> {
  override render() {
    const { playArea, x = 0, y = 0 } = this.props

    return (
      <Group x={x} y={y}>
        <Rect
          fill="rgba(0, 0, 0, 0.1)"
          height={200}
          stroke="rgba(0, 0, 0, 0.2)"
          strokeWidth={1}
          width={300}
          x={-150}
          y={-100}
        />
        <Text
          fill="rgba(0, 0, 0, 0.5)"
          text={`${playArea.name} (${playArea.cards.length} cards)`}
          x={-140}
          y={-90}
        />
      </Group>
    )
  }
}
