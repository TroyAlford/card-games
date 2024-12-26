// Game constructs
export type { ICard } from './source/Card'
export type { Player } from './source/Player'
export type { Team } from './source/Team'
export type { PlayArea } from './source/PlayArea'
export type { PlayerView } from './source/PlayerView'

// Game flow
export type { Event } from './source/Event'
export type { Phase, PhaseConfig } from './source/Phase'
export type { GameEvent } from './source/GameEvent'
export type { GameState } from './source/GameState'
export type { GameStateCallback, ErrorCallback } from './source/GameTypes'
export type { Turn } from './source/Turn'

// Game configuration
export type { DrawSourceConfig, CardDrawSourceConfig } from './source/DrawSource'
export type { CardGameConfig, CardGameState } from './source/CardGame'
export type { ChaosGameConfig, ChaosPlayer, ChaosGameState } from './source/ChaosGame'

// Effects system
export type { Effect } from './source/Effect'
export type { Enchantment } from './source/Enchantment'
export type { Trigger, TriggerCondition, TriggerEffect } from './source/Trigger'
export type { Modifier, ModifierEffect } from './source/Modifier'

// Card properties
export type { Color } from './source/Color'
export type { Suit } from './source/Suit'
export { STANDARD_COLORS } from './source/Color'
export { STANDARD_SUITS } from './source/Suit'
