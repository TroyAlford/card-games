import type * as Type from '@card-games/types'
import { makeObservable, observable } from 'mobx'
import type { ColorStore } from './stores/ColorStore'
import type { SuitStore } from './stores/SuitStore'

export class Card {
  @observable private current?: Type.Card
  private original: Type.Card
  private colorStore: ColorStore
  private suitStore: SuitStore

  constructor(
    original: Type.Card,
    colorStore: ColorStore,
    suitStore: SuitStore,
  ) {
    makeObservable(this)
    this.original = original
    this.colorStore = colorStore
    this.suitStore = suitStore
  }

  get id(): string {
    return this.current?.id ?? this.original.id
  }

  get rank(): Type.Rank {
    return this.current?.rank ?? this.original.rank
  }

  get suitId(): string {
    return this.current?.suit ?? this.original.suit
  }

  get suit(): Type.Suit {
    const suit = this.suitStore.getSuit(this.suitId)
    if (!suit) throw new Error(`Unknown suit: ${this.suitId}`)
    return suit
  }

  get colorId(): string {
    return this.current?.color ?? this.suit.color
  }

  get color(): Type.Color {
    const color = this.colorStore.getColor(this.colorId)
    if (!color) throw new Error(`Unknown color: ${this.colorId}`)
    return color
  }

  toJSON(): Type.Card {
    return {
      color: this.colorId,
      id: this.id,
      rank: this.rank,
      suit: this.suitId,
    }
  }
}
