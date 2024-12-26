import type { Card } from './Card'

export interface CardDrawSourceConfig {
  cards?: Card[],
  id: string,
  location: 'center' | 'player',
  maxCards?: number,
  type: 'shared' | 'personal',
}

export class CardDrawSource {
  public readonly id: string
  public readonly type: 'shared' | 'personal'
  public readonly location: 'center' | 'player'
  public readonly maxCards?: number

  private cards: Card[]
  private initialized = false

  constructor(config: CardDrawSourceConfig) {
    this.id = config.id
    this.type = config.type
    this.location = config.location
    this.maxCards = config.maxCards
    this.cards = []

    if (config.cards) {
      this.cards = [...config.cards]
    }
  }

  public initialize(): void {
    if (this.initialized) return
    this.shuffle()
    this.initialized = true
  }

  public async draw(count: number): Promise<Card[]> {
    if (!this.initialized) {
      throw new Error('CardDrawSource not initialized')
    }

    if (count <= 0) return []
    if (this.cards.length === 0) return []

    const drawn = this.cards.splice(0, count)
    return drawn
  }

  public async addCards(cards: Card[]): Promise<void> {
    this.cards.push(...cards)
    if (this.initialized) {
      this.shuffle()
    }
  }

  public getCards(): Card[] {
    return [...this.cards]
  }

  public shuffle(): void {
    // Fisher-Yates shuffle
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }
}
