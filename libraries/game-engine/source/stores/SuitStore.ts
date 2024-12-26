import * as Type from '@card-games/types'
import { action, computed, makeObservable, observable } from 'mobx'

export class SuitStore {
  @observable private suits = new Map<string, Type.Suit>()

  constructor() {
    makeObservable(this)
    this.addSuits(Type.BASIC_SUITS)
  }

  @action addSuit(suit: Type.Suit) {
    this.suits.set(suit.id, suit)
  }

  @action addSuits(suits: Type.Suit[]) {
    suits.forEach(suit => this.addSuit(suit))
  }

  @computed get allSuits(): Type.Suit[] {
    return Array.from(this.suits.values())
  }

  getSuit(id: string): Type.Suit | undefined {
    return this.suits.get(id)
  }
}
