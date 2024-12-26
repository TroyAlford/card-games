import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'
import { CARD_HEIGHT, CARD_WIDTH } from './Card'

interface DeckProps {
  label?: string,
  x: number,
  y: number,
}

export class Deck extends React.Component<DeckProps> {
  render() {
    const { label, x, y } = this.props

    return (
      <Group x={x} y={y}>
        {[4, 3, 2, 1, 0].map(i => (
          <Rect
            key={i}
            cornerRadius={6}
            fill="white"
            height={CARD_HEIGHT}
            stroke="black"
            strokeWidth={1}
            width={CARD_WIDTH}
            x={i * 0.5}
            y={i * 0.5}
          />
        ))}
        {label && (
          <Text
            align="center"
            fill="#2c3e50"
            fontSize={12}
            offsetX={CARD_WIDTH / 4}
            text={label}
            x={CARD_WIDTH / 2}
            y={CARD_HEIGHT + 5}
          />
        )}
      </Group>
    )
  }
}
