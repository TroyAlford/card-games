import type { GameStore } from '@card-games/game-engine'
import type { Effect, Enchantment, GameEvent, ICard, Modifier, PlayArea, Trigger } from '@card-games/types'
import type { CardDefinition } from '../../types/source/CardDefinition'

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
  public faceUp = false
  public playable = false
  public location: {
    id: string,
    ownerId?: string,
    type: string,
  }

  constructor(
    definition: CardDefinition,
    store: GameStore,
    location: { id: string, ownerId?: string, type: string },
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
