# Card Game Library

Specialized library building on the game engine to provide card-game-specific functionality.

## Core Features

### Card System
- **Card**: Base card implementation
  - Properties (value, suit, rank)
  - Effects system
  - Modifier system
  - Trigger system
- **CardGame**: Base card game implementation
  - Deck management
  - Hand management
  - Card movement tracking

### Draw Sources
- **CardDrawSource**: Manages card collections
  - Deck drawing
  - Card shuffling
  - Source initialization
  - Card limits

### Effect System

<code>
interface CardEffect {
  modifiers?: Modifier[]
  triggers?: Trigger[]
  type: string
}
</code>

### Event System

<code>
interface GameEvent {
  type: string
  source: ICard
  target?: ICard
  data?: any
}
</code>

## Implementation Details

### Card Definition

<code>
interface CardDefinition {
  id: string
  name: string
  type: string
  suit?: string
  rank?: string
  value: number
  effects?: CardEffect[]
}
</code>

### Card State
- Base properties
- Current state (modified by effects)
- Enchantments
- Triggers
- Visibility status
- Playability status

### Modifier System
- Apply/remove modifications
- Track modification state
- Handle effect priorities
- Support multiple effect types

## Development Guidelines
1. Build on game engine abstractions
2. Keep card effects composable
3. Maintain clear event flow
4. Support different card game styles:
   - Traditional card games
   - Collectible card games
   - Deck-building games
5. Enable easy creation of new card types 