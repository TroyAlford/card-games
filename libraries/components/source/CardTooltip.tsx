import type { Card as CardType } from '@card-games/card-game'
import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'
import type { GameComponentProps } from './GameComponent'
import { GameComponent } from './GameComponent'

interface CardTooltipProps extends GameComponentProps {
  card: CardType,
  x: number,
  y: number,
}

export class CardTooltip extends GameComponent<CardTooltipProps> {
  private getEnchantmentText(card: CardType): string {
    if (!card.enchantments.length) return 'No enchantments'

    return card.enchantments
      .map(e => `${e.name} (${e.type})`)
      .join('\n')
  }

  private getEffectsText(card: CardType): string {
    const changes: string[] = []

    if (card.value !== card.base.value) {
      changes.push(`Value: ${card.base.value} → ${card.value}`)
    }
    if (card.suit !== card.base.suit) {
      changes.push(`Suit: ${card.base.suit} → ${card.suit}`)
    }
    if (card.type !== card.base.type) {
      changes.push(`Type: ${card.base.type} → ${card.type}`)
    }
    if (card.rank !== card.base.rank) {
      changes.push(`Rank: ${card.base.rank} → ${card.rank}`)
    }

    return changes.join('\n')
  }

  override render() {
    const { card, x, y } = this.props
    const tooltipWidth = 200
    const tooltipHeight = 160

    return (
      <Group x={x} y={y}>
        <Rect
          cornerRadius={4}
          fill="white"
          height={tooltipHeight}
          opacity={0.9}
          stroke="black"
          strokeWidth={1}
          width={tooltipWidth}
        />
        <Text
          fontSize={14}
          text={`${card.name}\nBase Type: ${card.base.type}\nBase Value: ${card.base.value}`}
          x={10}
          y={10}
        />
        <Text
          fontSize={12}
          fontStyle="bold"
          text="Active Effects:"
          x={10}
          y={60}
        />
        <Text
          fill="#666"
          fontSize={12}
          text={this.getEffectsText(card)}
          x={10}
          y={75}
        />
        <Text
          fontSize={12}
          fontStyle="bold"
          text="Enchantments:"
          x={10}
          y={115}
        />
        <Text
          fill={card.enchantments.length ? 'gold' : '#666'}
          fontSize={12}
          text={this.getEnchantmentText(card)}
          x={10}
          y={130}
        />
      </Group>
    )
  }
}
