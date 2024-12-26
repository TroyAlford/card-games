import type * as Type from '@card-games/types'
import React from 'react'
import { Group, Rect, Text } from 'react-konva'

interface Props {
  deck: Type.Card[],
}

export class Deck extends React.Component<Props> {
  override render() {
    const { deck } = this.props

    return (
      <Group>
        <Rect
          fill="white"
          height={120}
          stroke="black"
          strokeWidth={1}
          width={80}
        />
        <Text
          fill="rgba(0, 0, 0, 0.5)"
          text={`${deck.length}`}
          x={10}
          y={10}
        />
      </Group>
    )
  }
}
