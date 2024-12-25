import * as React from 'react'
import { Group, Rect, Text } from 'react-konva'
import { Card } from '../Card'
import { Deck } from '../Deck'
import { CARD_WIDTH } from '../Card'

interface CommonAreaProps {
	y: number
	width: number
	height: number
	standardCards: Card[]
	jokerCards: Card[]
	enchantments: Card[]
	onCardClick?: (card: Card, source: string) => void
}

export class CommonArea extends React.Component<CommonAreaProps> {
	render() {
		const { y, width, height, standardCards, jokerCards, enchantments, onCardClick } = this.props
		const sectionWidth = Math.max(width / 3, 400) // Minimum width per section
		const cardSpacing = Math.min(CARD_WIDTH + 10, (sectionWidth - 200) / 5) // Adaptive card spacing

		return (
			<Group y={y}>
				<Rect width={width} height={height} fill="#27ae60" opacity={0.1} />

				{/* Standard deck and display */}
				<Group x={10} y={10}>
					<Text text="Standard Cards" fontSize={16} fill="#2c3e50" />
					<Deck x={40} y={30} label="Standard" />
					<Group x={120} y={30}>
						{standardCards.slice(0, 5).map((card, i) => (
							<Card
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
					<Text text="Jokers" fontSize={16} fill="#2c3e50" />
					<Deck x={40} y={30} label="Jokers" />
					<Group x={120} y={30}>
						{jokerCards.map((card, i) => (
							<Card
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
					<Text text="Enchantments" fontSize={16} fill="#2c3e50" />
					<Deck x={40} y={30} label="Enchant" />
					<Group x={120} y={30}>
						{enchantments.map((card, i) => (
							<Card
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