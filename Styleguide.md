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
