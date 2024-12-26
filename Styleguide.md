# TypeScript Style Guide

## File Organization

1. **No Barrel Files**
   - Do not create `index.ts` or `types.ts` files for re-exporting
   - Each file should export exactly what it contains
   - Name files after their primary export

2. **File Naming**
   - Use PascalCase for files that export a class, interface, or type
   - Match the file name to the primary export name
   - Example: `PokerGame.ts` exports `class PokerGame`

## Code Organization

1. **Imports**
   - Sort imports alphabetically
   - Group imports by external packages first, then internal imports
   - Use explicit imports instead of namespace imports, unless you need to avoid name collisions
   ```typescript
   // Good
   import { Game } from '@card-games/card-game'
   import { BASIC_DECK } from '@card-games/types'
   import { PokerGame } from './PokerGame'

   // Also Good, to avoid name collisions
   import * as Types from '@card-games/types'
   ```

2. **Exports**
   - Export types and interfaces directly where they are used
   - Always create separate files per type or interface. General-use types should be in the `./library/types` workspace, while local/specific types should be defined in their own file within the `types` folder of the workspace where they are used

## Common Patterns

1. **Class Construction**
   - Do not create empty constructors
   - If no initialization is needed, omit the constructor entirely
   ```typescript
   // Good
   class GameFactory {
     private static instance: GameFactory
     
     static getInstance(): GameFactory {
       // ...
     }
   }

   // Bad
   class GameFactory {
     private constructor() {}  // Empty constructor
   }
   ```

2. **Type Inference**
   - Let TypeScript infer types when they are obvious
   - Only add type annotations when they add clarity or are required
   ```typescript
   // Good
   private currentPlayerId = ''  // Type inferred as string

   // Bad
   private currentPlayerId: string = ''  // Redundant annotation
   ```

3. **Object Property Ordering**
   - Order interface and object properties alphabetically
   - Group required properties before optional ones
   ```typescript
   // Good
   interface GameOptions {
     id: string
     maxPlayers: number
     minPlayers: number
     name: string
     description?: string  // Optional props last
   }

   // Bad
   interface GameOptions {
     name: string
     id: string  // Not alphabetical
     description?: string
     maxPlayers: number
   }
   ```

4. **Null Checks**
   - Use optional chaining and nullish coalescing when possible
   - Avoid non-null assertions (!)
   ```typescript
   // Good
   const player = players.get(id)
   if (!player) return

   // Bad
   const player = players.get(id)!  // Non-null assertion
   ```

5. **Comments**
   - Use block comments for documentation
   - Use line comments for implementation notes
   ```typescript
   /**
    * Represents a card game
    */
   class Game {
     // Initialize player state
     private initializePlayers(): void {
       // ...
     }
   }
   ```

## Common Linting Rules

1. **Trailing Spaces**
   - Remove all trailing spaces at the end of lines
   - Remove all trailing spaces in empty lines

2. **Line Breaks**
   - Place operators at the start of the line in multi-line expressions
   ```typescript
   // Good
   const isValid = someCondition
     && anotherCondition
     && finalCondition

   // Bad
   const isValid = someCondition &&
     anotherCondition &&
     finalCondition
   ```

3. **Type Assertions**
   - Avoid type assertions when possible
   - Use type guards and runtime checks instead
   ```typescript
   // Good
   if (isPokerGame(game)) {
     game.dealCards()
   }

   // Bad
   (game as PokerGame).dealCards()
   ```

4. **Abstract Classes**
   - Do not access abstract properties in constructors
   - Initialize abstract properties through concrete implementations
   ```typescript
   // Good
   abstract class Game {
     protected state: State

     protected abstract createInitialState(): State

     constructor() {
       this.state = this.createInitialState()
     }
   }

   // Bad
   abstract class Game {
     protected abstract get initialState(): State

     constructor() {
       this.state = this.initialState  // Accessing abstract in constructor
     }
   }
   ``` 
