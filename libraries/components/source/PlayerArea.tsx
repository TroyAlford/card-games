import type { Card as CardModel } from '@card-games/card-game'
import * as React from 'react'
import { Group, Rect } from 'react-konva'
import { Card as CardComponent } from './Card'
import { CARD_WIDTH } from './Card'
import { Deck } from './Deck'
import { Menu } from './Menu'
import { PlayerStats } from './PlayerStats'

interface PlayerAreaProps {
  coins: number,
  hand: CardModel[],
  height: number,
  playArea: CardModel[],
  width: number,
  y: number,
}

export class PlayerArea extends React.Component<PlayerAreaProps> {
  override render() {
    const { coins, hand, height, playArea, width, y } = this.props
    const cardSpacing = Math.min(CARD_WIDTH + 10, (width - 200) / Math.max(hand.length, 1))
    const centerX = width / 2
    const handWidth = hand.length * cardSpacing

    return (
      <Group y={y}>
        <Rect
          fill="#2c3e50"
          height={height}
          opacity={0.1}
          width={width}
        />
        <Menu x={10} y={height - 60} />
        <PlayerStats coins={coins} x={10} y={10} />
        <Group x={centerX - (handWidth / 2)} y={20}>
          {playArea.map((card, i) => (
            <CardComponent
              key={card.id}
              card={card}
              x={i * cardSpacing}
              y={0}
            />
          ))}
        </Group>
        <Group x={centerX - (handWidth / 2)} y={height - 120}>
          {hand.map((card, i) => (
            <CardComponent
              key={card.id}
              card={card}
              x={i * cardSpacing}
              y={0}
            />
          ))}
        </Group>
        <Deck x={width - 90} y={height - 110} />
      </Group>
    )
  }
}
