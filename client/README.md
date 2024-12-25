# Card Games Client

A React-based client for playing card games, with a focus on extensibility and real-time gameplay. Built using React, Konva for canvas-based rendering, and MobX for state management.

## Architecture

### Component Structure
- **Application**: Root component handling window resizing and overall layout
- **GameBoard**: Main game area divided into three sections:
  - OpponentArea (top)
  - CommonArea (middle)
  - PlayerArea (bottom)

### Key Features
- Canvas-based rendering for optimal performance
- Responsive design that adapts to window resizing
- Support for card enchantments and modifications
- Real-time game state updates via MobX

### Card Display System
Cards are rendered with:
- Base values and suits
- Enchantment indicators (gold border + ✨)
- Color coding based on suit or enchantments
- Tooltips showing detailed card information

### Layout Philosophy
The game board is divided into three equal vertical sections:
1. **Opponent Area**: Shows other players' hands (face-down) and resources
2. **Common Area**: Displays available cards from different decks (Standard, Jokers, Enchantments)
3. **Player Area**: Shows the current player's hand and play area

## Implementation Details

### Responsive Design
- Window resizing is handled at the Application level
- Components use relative positioning and adaptive spacing
- Card spacing adjusts based on available width
- Minimum widths prevent overcrowding

### State Management
- Uses MobX for reactive state management
- Game state is centralized in the GameStore
- Components observe and react to state changes

### Card Interactions
- Cards can be clicked to purchase/play
- Different card sources (Standard, Jokers, Enchantments) have different costs
- Cards can be enchanted, modifying their properties

## Development Guidelines
1. Always use class components (no hooks)
2. Maintain responsive layouts
3. Keep card rendering consistent across all areas
4. Use MobX for state management
5. Follow the established component hierarchy 