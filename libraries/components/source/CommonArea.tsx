import type { Card as CardModel } from '@card-games/card-game'
import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'
import { Card as CardComponent } from './Card'
import { CARD_WIDTH } from './Card'
import { Deck } from './Deck'

interface CommonAreaProps {
  enchantments: CardModel[],
  height: number,
  jokerCards: CardModel[],
  onCardClick?: (card: CardModel, source: string) => void,
  standardCards: CardModel[],
  width: number,
  y: number,
}

export class CommonArea extends React.Component<CommonAreaProps> {
  override render() {
    const { enchantments, height, jokerCards, onCardClick, standardCards, width, y } = this.props
    const sectionWidth = Math.max(width / 3, 400) // Minimum width per section
    const cardSpacing = Math.min(CARD_WIDTH + 10, (sectionWidth - 200) / 5) // Adaptive card spacing

    return (
      <Group y={y}>
        <Rect
          fill="#27ae60"
          height={height}
          opacity={0.1}
          width={width}
        />
        {/* Standard deck and display */}
        <Group x={10} y={10}>
          <Text fill="#2c3e50" fontSize={16} text="Standard Cards" />
          <Deck label="Standard" x={40} y={30} />
          <Group x={120} y={30}>
            {standardCards.slice(0, 5).map((card, i) => (
              <CardComponent
                key={card.id}
                card={card}
                x={i * cardSpacing}
                y={0}
                onClick={() => onCardClick?.(card, 'standard-deck')}
              />
            ))}
          </Group>
        </Group>
        {/* Jokers deck and display */}
        <Group x={sectionWidth + 10} y={10}>
          <Text fill="#2c3e50" fontSize={16} text="Jokers" />
          <Deck label="Jokers" x={40} y={30} />
          <Group x={120} y={30}>
            {jokerCards.map((card, i) => (
              <CardComponent
                key={card.id}
                card={card}
                x={i * (CARD_WIDTH + 10)}
                y={0}
                onClick={() => onCardClick?.(card, 'jokers-deck')}
              />
            ))}
          </Group>
        </Group>
        {/* Enchantments */}
        <Group x={(sectionWidth * 2) + 10} y={10}>
          <Text fill="#2c3e50" fontSize={16} text="Enchantments" />
          <Deck label="Enchant" x={40} y={30} />
          <Group x={120} y={30}>
            {enchantments.map((card, i) => (
              <CardComponent
                key={card.id}
                card={card}
                x={i * (CARD_WIDTH + 10)}
                y={0}
                onClick={() => onCardClick?.(card, 'enchantments-deck')}
              />
            ))}
          </Group>
        </Group>
      </Group>
    )
  }
}
