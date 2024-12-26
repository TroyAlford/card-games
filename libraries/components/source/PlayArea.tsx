import type * as Type from '@card-games/types'
import React from 'react'
import { Group, Rect, Text } from 'react-konva'

interface Props {
  playArea: Type.PlayArea,
}

export class PlayArea extends React.Component<Props> {
  override render() {
    const { playArea } = this.props

    return (
      <Group>
        <Rect
          fill="rgba(0, 0, 0, 0.1)"
          height={200}
          stroke="rgba(0, 0, 0, 0.2)"
          strokeWidth={1}
          width={300}
        />
        <Text
          fill="rgba(0, 0, 0, 0.5)"
          text={`${playArea.name} (${playArea.cards.length} cards)`}
          x={10}
          y={10}
        />
      </Group>
    )
  }
}
