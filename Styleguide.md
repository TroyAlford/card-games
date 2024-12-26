# Card Games Styleguide

## Project Structure
The project is organized into three main workspace types, defined in the root `package.json`:

### Applications
- Runnable applications that can be executed
- Do not export any functionality
- Can import from both `games` and `libraries` workspaces
- Example: `applications/client`, `applications/server`

### Games
- Individual card game implementations
- Can only import from `libraries` workspace
- Export their executable parts for use by applications
- Example: `games/poker`, `games/hearts`

### Libraries
Internal building blocks used across games and applications:

#### @types
- The foundational library, used by all other libraries
- Contains only:
  - Types
  - Interfaces
  - Enums
  - Constants
- No runtime code or logic

#### @utilities
- Pure utility functions
- Imports only from `@types`
- No side effects or state management
- Exports reusable functions for use throughout the codebase

#### @components
- React components using `mobx` and `react-konva`
- Imports from `@types` and `@utilities`
- Used for front-end applications
- Class-based React components only (no hooks)

## State Management

### Server State
- Full game state lives in `GameState`
- Contains complete information about:
  - All players
  - All decks (game-level and player-level)
  - All play areas (common and player-specific)
- Manages game rules and state transitions
- Source of truth for game progression

### Client State
- Partial game state in `PlayerGameState`
- Contains only information visible to the current player:
  - Their own cards/decks
  - Common play areas
  - Limited information about other players
- Syncs with server but maintains local state for responsiveness

### Store Architecture
- Each major state type has a corresponding store
- Stores are mobx-based classes
- Follow naming pattern: `{Type}Store`
- Example: `GameStateStore`, `PlayerStateStore`

## Component Architecture

### Canvas Components
- Use `react-konva` for all game board elements
- Each visual element is a separate component
- Components handle their own animations/transitions
- Example: `PlayArea`, `Deck`, `Card`

### Layout Components
- Regular React components for UI structure
- Handle arrangement of canvas elements
- Manage responsive design
- Example: `GameBoard`, `PlayerHand`

## Styling

### SCSS Architecture
- Each component has its own SCSS module
- File naming: `ComponentName.module.scss`
- Import in component: `import styles from './ComponentName.module.scss'`
- Use BEM-like naming: `componentName__element--modifier`

### SCSS Organization
- Variables in `_variables.scss`
- Mixins in `_mixins.scss`
- Global styles in `global.scss`
- Component styles in their respective modules
- No global styles except for base HTML elements

### Style Rules
- Use relative units (rem, em) over pixels
- CSS Grid for layouts
- Flexbox for component internals
- Mobile-first responsive design
- Color variables for consistent theming
- Z-index scale in variables

## Naming Conventions

### Files
- One type/interface/component per file
- File name must match the name of its primary export
- PascalCase for all files containing:
  - Types
  - Interfaces
  - Components
  - Classes
- Example: `Card.tsx`, `CardGame.ts`, `DeckUtils.ts`

### Exports
- Named exports only (no default exports)
- Export name must match file name for primary exports
- Example: `export class Card extends React.Component`

### Types and Interfaces
- No "I" prefix for interfaces
- PascalCase naming
- Example: `interface Card`, not `interface ICard`

### Type Imports
- Import all types from a module using namespace import
- Use `Type` as the namespace identifier
- Example: `import * as Type from '@card-games/types'`
- Reference types as `Type.Card`, `Type.CardSuit`, etc.
- Never use `import type { Foo as FooType }`

## Code Style
- 2-space indentation (no tabs)
- No trailing spaces
- Files must end with a newline
- Object keys are alphabetically sorted
- Import statements are sorted and grouped by:
  1. External packages
  2. Internal libraries (@types, @utilities, etc)
  3. Relative imports
- Class-based React components (no hooks)
- Explicit type annotations preferred over inference 
