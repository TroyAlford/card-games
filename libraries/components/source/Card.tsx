import type { Card as CardType } from '@card-games/card-game'
import type { KonvaEventObject } from 'konva/lib/Node'
import { computed } from 'mobx'
import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'
import type { GameComponentProps } from './GameComponent'
import { GameComponent } from './GameComponent'

export const CARD_WIDTH = 71
export const CARD_HEIGHT = 100
const CORNER_RADIUS = 6

interface CardProps extends GameComponentProps {
  card?: CardType,
  faceDown?: boolean,
  onClick?: (e: KonvaEventObject<MouseEvent>) => void,
  onMouseEnter?: (e: KonvaEventObject<MouseEvent>) => void,
  onMouseLeave?: (e: KonvaEventObject<MouseEvent>) => void,
  x: number,
  y: number,
}

export class Card extends GameComponent<CardProps> {
  @computed
  private get cardSuit() {
    const { card } = this.props
    if (!card) return undefined
    return this.store.state.suits[card.suit]
  }

  @computed
  private get cardColor() {
    const { card } = this.props
    if (!card) return undefined

    // If card has an enchanted color, use that
    if (card.color) {
      return this.store.state.colors[card.color]
    }

    // Otherwise use the suit's color
    const suit = this.cardSuit
    if (!suit) return undefined

    return this.store.state.colors[suit.colorId]
  }

  private hasEnchantments(card: CardType | undefined): boolean {
    return !!card?.enchantments?.length
  }

  private handleMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
    this.props.onMouseEnter?.(e)
  }

  private handleMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
    this.props.onMouseLeave?.(e)
  }

  private handleClick = (e: KonvaEventObject<MouseEvent>) => {
    this.props.onClick?.(e)
  }

  override render() {
    const { card, faceDown, x, y } = this.props
    const hasEnchantments = this.hasEnchantments(card)
    const suit = this.cardSuit
    const color = this.cardColor

    return (
      <Group
        x={x}
        y={y}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Rect
          cornerRadius={CORNER_RADIUS}
          fill={faceDown ? '#34495e' : 'white'}
          height={CARD_HEIGHT}
          stroke={hasEnchantments ? 'gold' : 'black'}
          strokeWidth={hasEnchantments ? 2 : 1}
          width={CARD_WIDTH}
        />
        {!faceDown && card && suit && (
          <>
            <Text
              fill={color?.hex ?? 'black'}
              fontSize={16}
              lineHeight={1.2}
              text={`${card.value}\n${suit.icon}`}
              x={6}
              y={6}
            />
            {hasEnchantments && (
              <Text
                fill="gold"
                fontSize={12}
                text="✨"
                x={CARD_WIDTH - 16}
                y={6}
              />
            )}
          </>
        )}
      </Group>
    )
  }
}
