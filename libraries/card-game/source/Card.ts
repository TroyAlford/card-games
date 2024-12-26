import type { ICard, Effect, Enchantment, GameEvent, Modifier, PlayArea, Trigger } from '@card-games/types'
import type { CardDefinition } from '../../types/source/CardDefinition'
import { GameStore } from '@card-games/game-engine'

/**
 * Implementation of a card in the game.
 */
export class Card implements ICard {
	public readonly base: CardDefinition['base']
	protected readonly store: GameStore
	public readonly effects: Effect[]
	public readonly modifiers: Modifier[]
	public readonly triggers: Trigger[]
	public readonly enchantments: Enchantment[]
	public readonly id: string
	public readonly name: string
	public faceUp: boolean = false
	public playable: boolean = false
	public location: {
		type: string
		id: string
		ownerId?: string
	}

	constructor(
		definition: CardDefinition,
		store: GameStore,
		location: { type: string; id: string; ownerId?: string }
	) {
		this.base = definition.base
		this.store = store
		this.effects = definition.effects || []
		this.modifiers = []
		this.triggers = []
		this.enchantments = []
		this.id = crypto.randomUUID()
		this.name = definition.name
		this.location = location
	}

	// ... rest of the implementation
} 