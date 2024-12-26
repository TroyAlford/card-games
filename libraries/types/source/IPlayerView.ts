import type { PlayArea } from '@card-games/game-engine'
import type { Phase } from '../Phase'
import type { ICard } from './ICard'

export interface IPlayerView {
  canPlay: boolean,
  currentPhase: Phase,
  currentTurn: string,
  enchantments: {
    areaId?: string,
    cardId?: string,
    effects: any[],
    playerId?: string,
  }[],
  gameId: string,
  hand: ICard[],
  isMyTurn: boolean,
  otherPlayers: {
    handSize: number,
    id: string,
    name: string,
    team?: string,
  }[],
  playerId: string,
  status: 'waiting' | 'active' | 'finished',
  table: ICard[],
  visibleDrawSources: {
    id: string,
    location: string,
    topCard?: ICard,
    type: 'personal' | 'shared',
  }[],
  visiblePlayAreas: PlayArea[],
}
