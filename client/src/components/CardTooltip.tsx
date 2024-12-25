import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'
import type { Card as CardType } from '@card-games/card-game'
import { GameComponent, GameComponentProps } from './GameComponent'

interface CardTooltipProps extends GameComponentProps {
	card: CardType
	x: number
	y: number
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

		if (card.value !== card.base.baseValue) {
			changes.push(`Value: ${card.base.baseValue} → ${card.value}`)
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
					width={tooltipWidth}
					height={tooltipHeight}
					fill="white"
					stroke="black"
					strokeWidth={1}
					cornerRadius={4}
					opacity={0.9}
				/>
				<Text
					x={10}
					y={10}
					text={`${card.name}\nBase Type: ${card.base.type}\nBase Value: ${card.base.baseValue}`}
					fontSize={14}
				/>
				<Text
					x={10}
					y={60}
					text="Active Effects:"
					fontSize={12}
					fontStyle="bold"
				/>
				<Text
					x={10}
					y={75}
					text={this.getEffectsText(card)}
					fontSize={12}
					fill="#666"
				/>
				<Text
					x={10}
					y={115}
					text="Enchantments:"
					fontSize={12}
					fontStyle="bold"
				/>
				<Text
					x={10}
					y={130}
					text={this.getEnchantmentText(card)}
					fontSize={12}
					fill={card.enchantments.length ? 'gold' : '#666'}
				/>
			</Group>
		)
	}
} 