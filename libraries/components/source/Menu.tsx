import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'

interface MenuProps {
  x: number,
  y: number,
}

export class Menu extends React.Component<MenuProps> {
  render() {
    const { x, y } = this.props

    return (
      <Group x={x} y={y}>
        <Rect
          cornerRadius={4}
          fill="#34495e"
          height={50}
          stroke="#2c3e50"
          strokeWidth={1}
          width={50}
        />
        <Text
          align="center"
          fill="white"
          fontSize={24}
          offsetX={12}
          offsetY={12}
          text="☰"
          verticalAlign="middle"
          x={25}
          y={25}
        />
      </Group>
    )
  }
}
