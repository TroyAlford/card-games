import * as React from 'react'
import { Circle, Group, Path, Text } from 'react-konva'

interface PlayerStatsProps {
  coins: number,
  x: number,
  y: number,
}

export class PlayerStats extends React.Component<PlayerStatsProps> {
  render() {
    const { coins, x, y } = this.props

    return (
      <Group x={x} y={y}>
        <Circle
          fill="#f1c40f"
          radius={12}
          stroke="#f39c12"
          strokeWidth={1}
        />
        <Text
          align="center"
          fill="#e67e22"
          fontSize={16}
          offsetX={8}
          offsetY={8}
          text="$"
          verticalAlign="middle"
          x={0}
          y={0}
        />
        <Text
          fill="#2c3e50"
          fontSize={16}
          fontStyle="bold"
          text={coins.toString()}
          x={20}
          y={-8}
        />
      </Group>
    )
  }
}
