# Card Games

A client-server based card game framework supporting multiple card game implementations.

## Architecture Overview

### Core Components

- **Game Engine**: Server-side engine managing game state and rules
  - Full game state management (JSON serializable)
  - Turn and phase management
  - Event handling and resolution
  - Player state visibility control

- **Card Game Library**: Abstraction layer for card game implementations
  - Base card properties (suit, color, rank)
  - Enchantment system (card/player/game level)
  - Turn phases (draw/play/discard)
  - Event system

### Game Flow

1. Server maintains complete game state
2. Players take sequential turns with multiple phases
3. Player actions raise events to the dealer
4. Dealer resolves events with full context
5. Updates sent to players via socket with visibility restrictions

### Player Perspective

- Players see only their permitted information
- Common/public play areas visible to all
- Private areas (hands) visible only to owner
- Actions validated and resolved by server

## Project Structure

- `/client` - Web client implementation
- `/server` - Game server and state management
- `/libraries`
  - `/game-engine` - Core game engine
  - `/card-game` - Card game abstractions
- `/games` - Individual game implementations

## Development

Currently running in client-side mode for development simplicity, with planned migration to full client-server architecture.
