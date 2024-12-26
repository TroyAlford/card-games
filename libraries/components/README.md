# Card Games Components

React component library for rendering card game UI elements using `react-konva`.

## Purpose

This library provides the base UI components needed to render card games in the browser. It focuses on visual representation and user interaction, while keeping game logic separate.

## Key Components

- **PlayArea**: Base component for rendering game areas
  - Common areas (shared/public spaces)
  - Player areas (hand, personal play space)
  - Draw/discard areas

- **Card Rendering**: Components for displaying cards
  - Face-up/face-down states
  - Drag and drop interactions
  - Animation states

- **UI Elements**: Common game interface components
  - Action buttons
  - Phase indicators
  - Player status displays

## Usage

Components are designed to be purely presentational, receiving all game state and callbacks as props. This ensures separation between:
- Visual representation (this library)
- Game state management (@game-engine)
- Game rules/logic (@card-game)
- Specific game implementations (@chaos)

## Development

Components should:
- Be stateless where possible
- Use `react-konva` for rendering
- Accept clear, typed props
- Include no game-specific logic
- Focus on reusability 