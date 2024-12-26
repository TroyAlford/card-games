import { makeAutoObservable } from 'mobx'
import type { Color } from '../../../types/source/Color'
import { STANDARD_COLORS } from '../../../types/source/Color'
import type { GameState } from '../../../types/source/GameState'
import type { PlayArea } from '../../../types/source/PlayArea'
import type { Player } from '../../../types/source/Player'
import type { RelationshipManager } from '../../../types/source/RelationshipManager'
import type { Suit } from '../../../types/source/Suit'
import { STANDARD_SUITS } from '../../../types/source/Suit'
import type { Team } from '../../../types/source/Team'

export class GameStore {
  public state: GameState

  constructor() {
    this.state = this.createInitialState()
    makeAutoObservable(this)
  }

  private createInitialState(): GameState {
    return {
      colors: STANDARD_COLORS,
      currentTurn: 0,
      id: crypto.randomUUID(),
      playAreas: [],
      players: [],
      status: 'waiting',
      suits: STANDARD_SUITS,
      teams: [],
    }
  }

  // Player management
  public addPlayer(player: Player) {
    this.state.players.push(player)
  }

  public removePlayer(playerId: string) {
    this.state.players = this.state.players.filter(p => p.id !== playerId)
  }

  public getPlayer(playerId: string) {
    return this.state.players.find(p => p.id === playerId)
  }

  // Team management
  public addTeam(team: Team) {
    this.state.teams.push(team)
  }

  public removeTeam(teamId: string) {
    this.state.teams = this.state.teams.filter(t => t.id !== teamId)
  }

  // Play area management
  public addPlayArea(area: PlayArea) {
    this.state.playAreas.push(area)
  }

  public removePlayArea(areaId: string) {
    this.state.playAreas = this.state.playAreas.filter(a => a.id !== areaId)
  }

  public getPlayArea(areaId: string) {
    return this.state.playAreas.find(a => a.id === areaId)
  }

  // Game state management
  public startGame() {
    if (this.state.status !== 'waiting') {
      throw new Error('Game already started')
    }
    this.state.status = 'active'
  }

  public endGame() {
    this.state.status = 'finished'
  }

  // Relationship management
  public getRelationshipManager(): RelationshipManager {
    return {
      getRelationship: (sourceId: string, targetId: string) => {
        const sourcePlayer = this.getPlayer(sourceId)
        const targetPlayer = this.getPlayer(targetId)

        if (!sourcePlayer || !targetPlayer) {
          return { teamId: '', type: 'neutral' }
        }

        if (sourcePlayer.teamId === targetPlayer.teamId) {
          return { teamId: sourcePlayer.teamId!, type: 'allied' }
        }

        return { teamId: targetPlayer.teamId!, type: 'opponent' }
      },
      isAllied: (sourceId: string, targetId: string) => {
        const relationship = this.getRelationshipManager().getRelationship(sourceId, targetId)
        return relationship.type === 'allied'
      },
      isOpponent: (sourceId: string, targetId: string) => {
        const relationship = this.getRelationshipManager().getRelationship(sourceId, targetId)
        return relationship.type === 'opponent'
      },
    }
  }

  // Helper methods for play areas
  public getRelevantPlayAreas(playerId?: string): PlayArea[] {
    if (!playerId) {
      return this.state.playAreas.filter(area => area.type === 'common')
    }

    const player = this.getPlayer(playerId)
    if (!player) return []

    const relationshipManager = this.getRelationshipManager()

    return this.state.playAreas.filter(area => {
      if (area.type === 'common') return true
      if (!area.ownerId) return false

      switch (area.type) {
        case 'personal':
          return area.ownerId === playerId
        case 'allied':
          return relationshipManager.isAllied(playerId, area.ownerId)
        case 'opponent':
          return relationshipManager.isOpponent(playerId, area.ownerId)
        default:
          return false
      }
    })
  }

  // Suit and color management
  public addSuit(id: string, suit: Suit) {
    this.state.suits[id] = suit
  }

  public addColor(id: string, color: Color) {
    this.state.colors[id] = color
  }
}
