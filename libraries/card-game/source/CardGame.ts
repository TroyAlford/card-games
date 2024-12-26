import type { GameState, Player } from '@card-games/game-engine'
import { Game } from '@card-games/game-engine'
import type { GameEvent } from '../../types/source/GameEvent'
import type { Card } from './Card'
import type { CardDrawSource } from './CardDrawSource'

export interface CardGameConfig {
  drawSources: CardDrawSource[],
  startingHandSize: number,
}

export interface CardGameState extends GameState {
  drawSources: Record<string, Card[]>,
  effects: Record<string, any>,
  hands: Record<string, Card[]>,
  table: Card[],
}

export abstract class CardGame extends Game<CardGameState> {
  protected readonly config: CardGameConfig

  constructor(config: CardGameConfig) {
    super({
      currentTurn: 0,
      drawSources: {},
      effects: {},
      hands: {},
      id: crypto.randomUUID(),
      players: [],
      status: 'waiting',
      table: [],
    })
    this.config = config
  }

  public override async start(): Promise<void> {
    await super.start()
    await this.initializeGame()
  }

  protected async initializeGame(): Promise<void> {
    // Initialize all draw sources
    this.config.drawSources.forEach(source => {
      source.initialize()
      this.state.drawSources[source.id] = []
    })

    // Deal initial hands if needed
    if (this.config.startingHandSize > 0) {
      await this.dealInitialHands()
    }
  }

  protected async dealInitialHands(): Promise<void> {
    const playerSources = this.config.drawSources.filter(
      source => source.type === 'personal' && source.location === 'player',
    )

    for (const player of this.state.players) {
      // Find this player's draw source if they have one
      const personalSource = playerSources.find(
        source => source.id.includes(player.id),
      )

      // Draw from either personal or shared source
      const source = personalSource || this.config.drawSources.find(
        source => source.type === 'shared' && source.location === 'center',
      )

      if (source) {
        this.state.hands[player.id] = await source.draw(
          this.config.startingHandSize,
        )
      }
    }
  }

  public getPlayer<T extends Player>(playerId: string): T {
    const player = super.getPlayer(playerId)
    if (!player) throw new Error('Player not found')
    return player as T
  }

  public getDrawSource(sourceId: string): CardDrawSource {
    const source = this.config.drawSources.find(s => s.id === sourceId)
    if (!source) throw new Error('Invalid draw source')
    return source
  }

  public async drawCards(source: CardDrawSource, count: number): Promise<Card[]> {
    const cards = await source.draw(count)
    if (cards.length === 0) throw new Error('No cards available')
    return cards
  }

  public async addCardsToHand(playerId: string, cards: Card[]): Promise<void> {
    if (!this.state.hands[playerId]) {
      this.state.hands[playerId] = []
    }
    this.state.hands[playerId].push(...cards)
  }

  public async refillDrawSource(source: CardDrawSource, maxCards: number): Promise<void> {
    const displayCards = this.state.drawSources[source.id] || []
    while (displayCards.length < maxCards) {
      const newCards = await source.draw(1)
      if (newCards.length === 0) break
      displayCards.push(...newCards)
    }
    this.state.drawSources[source.id] = displayCards
  }

  protected abstract validateMove(playerId: string, cards: Card[]): boolean
  protected abstract calculateScore(): Record<string, number>

  public async playCards(playerId: string, cards: Card[]): Promise<void> {
    if (!this.validateMove(playerId, cards)) {
      throw new Error('Invalid move')
    }

    // Move cards from hand to table
    const playerHand = this.state.hands[playerId]
    cards.forEach(card => {
      const index = playerHand.findIndex(c => c.id === card.id)
      if (index !== -1) {
        playerHand.splice(index, 1)
        this.state.table.push(card)
      }
    })

    // Create and process the card play event
    const event: GameEvent = {
      payload: { cards },
      playerId,
      timestamp: Date.now(),
      type: 'CARDS_PLAYED',
    }

    // Process triggers on all cards in play
    await Promise.all([
      ...this.state.table,
      ...Object.values(this.state.hands).flat(),
    ].map(card => this.handleCardEvent(card, event)))

    await this.save()
  }

  protected async handleCardEvent(card: Card, event: GameEvent): Promise<void> {
    await card.handleEvent(event)
  }
}
