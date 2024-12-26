import type { GameStore } from '@card-games/game-engine'
import { observer } from 'mobx-react'
import * as React from 'react'
import { StoreContext } from './StoreProvider'

export interface GameComponentProps {
  store?: GameStore, // Make store optional since we'll get it from context
}

@observer
export class GameComponent<P extends GameComponentProps = GameComponentProps> extends React.Component<P> {
  static override contextType = StoreContext
  declare context: React.ContextType<typeof StoreContext>

  protected get store(): GameStore {
    // Use store from props if provided, otherwise use context
    return this.props.store ?? this.context ?? this.throwNoStore()
  }

  private throwNoStore(): never {
    throw new Error('Component must be wrapped in StoreProvider or provided a store prop')
  }

  protected get currentPlayerId(): string | undefined {
    return this.store.state.currentTurn >= 0 && this.store.state.players.length > 0
      ? this.store.state.players[this.store.state.currentTurn]?.id
      : undefined
  }

  protected get isGameActive(): boolean {
    return this.store.state.status === 'active'
  }

  protected get currentPlayer() {
    return this.currentPlayerId
      ? this.store.getPlayer(this.currentPlayerId)
      : undefined
  }

  protected getPlayerTeam(playerId: string) {
    const player = this.store.getPlayer(playerId)
    return player?.teamId
      ? this.store.state.teams.find(t => t.id === player.teamId)
      : undefined
  }

  protected getPlayerRelationship(sourceId: string, targetId: string) {
    return this.store.getRelationshipManager().getRelationship(sourceId, targetId)
  }

  protected isPlayerAllied(sourceId: string, targetId: string): boolean {
    return this.store.getRelationshipManager().isAllied(sourceId, targetId)
  }

  protected isPlayerOpponent(sourceId: string, targetId: string): boolean {
    return this.store.getRelationshipManager().isOpponent(sourceId, targetId)
  }

  protected getRelevantPlayAreas(playerId?: string) {
    return this.store.getRelevantPlayAreas(playerId)
  }

  override render(): React.ReactNode {
    return null
  }
}
