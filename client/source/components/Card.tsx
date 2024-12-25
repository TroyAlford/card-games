import * as React from 'react'
import { computed } from 'mobx'
import { Group, Rect, Text } from 'react-konva'
import type { Card as CardType } from '@card-games/card-game'
import { GameComponent, GameComponentProps } from './GameComponent'
import type { KonvaEventObject } from 'konva/lib/Node'

export const CARD_WIDTH = 71
export const CARD_HEIGHT = 100
const CORNER_RADIUS = 6

interface CardProps extends GameComponentProps {
	card?: CardType
	x: number
	y: number
	faceDown?: boolean
	onMouseEnter?: (e: KonvaEventObject<MouseEvent>) => void
	onMouseLeave?: (e: KonvaEventObject<MouseEvent>) => void
	onClick?: (e: KonvaEventObject<MouseEvent>) => void
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
		const { card, x, y, faceDown } = this.props
		const hasEnchantments = this.hasEnchantments(card)
		const suit = this.cardSuit
		const color = this.cardColor

		return (
			<Group
				x={x}
				y={y}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				onClick={this.handleClick}
			>
				<Rect
					width={CARD_WIDTH}
					height={CARD_HEIGHT}
					fill={faceDown ? '#34495e' : 'white'}
					stroke={hasEnchantments ? 'gold' : 'black'}
					strokeWidth={hasEnchantments ? 2 : 1}
					cornerRadius={CORNER_RADIUS}
				/>
				{!faceDown && card && suit && (
					<>
						<Text
							x={6}
							y={6}
							text={`${card.value}\n${suit.icon}`}
							fontSize={16}
							fill={color?.hex ?? 'black'}
							lineHeight={1.2}
						/>
						{hasEnchantments && (
							<Text
								x={CARD_WIDTH - 16}
								y={6}
								text="✨"
								fontSize={12}
								fill="gold"
							/>
						)}
					</>
				)}
			</Group>
		)
	}
} 