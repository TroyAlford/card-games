# Game Engine Library

Core game engine providing fundamental constructs for building card games and other turn-based games.

## Core Concepts

### Game State Management
- **GameState**: Base state interface including:
  - Players
  - Teams
  - Play Areas
  - Turn tracking
  - Game status

### Relationships
- **Teams**: Groups of allied players
- **PlayAreas**: Designated spaces for cards/components
- **RelationshipManager**: Handles player/team relationships
  - Allied
  - Opponent
  - Neutral

### Game Flow
- **Phase**: Abstract game phase handling
- **Turn**: Tracks player actions and events
- **Event**: Game event system
- **DrawSource**: Abstract source for game components

### Visual Elements
- **Suits**: Standard card suit definitions
- **Colors**: Color system for game elements

## Implementation Details

### State Management

<code>
interface GameState {
  id: string
  players: Player[]
  teams: Team[]
  playAreas: PlayArea[]
  currentTurn: number
  status: 'waiting' | 'active' | 'finished'
  suits: Record<string, Suit>
  colors: Record<string, Color>
}
</code>

### Effect System

<code>
interface Effect {
  type: string
  property: string
  operation: 'add' | 'multiply' | 'set' | 'transform'
  value: number | string | ((current: any) => any)
  priority?: number
}
</code>

### Enchantment System

<code>
interface Enchantment {
  id: string
  name: string
  type: 'area' | 'player' | 'card'
  duration?: number | 'permanent'
  condition?: (target: any) => boolean
  effects: Effect[]
}
</code>

## Development Guidelines
1. Keep core systems abstract and extensible
2. Use TypeScript for type safety
3. Implement clear interfaces for all major systems
4. Maintain separation of concerns between systems
5. Document all public APIs and interfaces 