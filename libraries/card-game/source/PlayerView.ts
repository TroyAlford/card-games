import type { ICard } from '../../types/source/ICard'
import type { IPlayerView } from '../../types/source/IPlayerView'
import type { GameClient } from './GameClient'

export class PlayerView {
  private readonly client: GameClient
  private data: IPlayerView

  constructor(client: GameClient, data: IPlayerView) {
    this.client = client
    this.data = data
  }

  public get gameId(): string { return this.data.gameId }
  public get playerId(): string { return this.data.playerId }
  public get currentTurn(): string { return this.data.currentTurn }
  public get currentPhase(): string { return this.data.currentPhase }
  public get hand(): ICard[] { return this.data.hand }
  public get table(): ICard[] { return this.data.table }
  public get isMyTurn(): boolean { return this.data.isMyTurn }
  public get canPlay(): boolean { return this.data.canPlay }
  public get status(): string { return this.data.status }

  public get teammates(): { id: string, name: string }[] {
    return this.data.otherPlayers
      .filter(p => p.team && this.getMyTeam() === p.team)
      .map(({ id, name }) => ({ id, name }))
  }

  public get opponents(): { id: string, name: string }[] {
    return this.data.otherPlayers
      .filter(p => !p.team || this.getMyTeam() !== p.team)
      .map(({ id, name }) => ({ id, name }))
  }

  private getMyTeam(): string | undefined {
    const me = this.data.otherPlayers.find(p => p.id === this.playerId)
    return me?.team
  }

  public getEnchantments(card: ICard): any[] {
    return this.data.enchantments
      .filter(e => e.cardId === card.id)
      .map(e => e.effects)
      .flat()
  }

  public async play(card: ICard): Promise<void> {
    if (!this.canPlay) throw new Error('Cannot play cards right now')
    if (!this.hand.some(c => c.id === card.id)) {
      throw new Error('Card not in hand')
    }

    await this.client.playCards([card])
  }

  public async draw(sourceId: string): Promise<void> {
    const source = this.data.visibleDrawSources.find(s => s.id === sourceId)
    if (!source) throw new Error('Draw source not found or not visible')

    await this.client.drawCards(sourceId)
  }

  public update(view: IPlayerView): void {
    this.data = view
  }

  public toJSON(): IPlayerView {
    return { ...this.data }
  }
}
