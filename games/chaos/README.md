# Chaos Card Game

A deck-building card game where players use coins to purchase and enhance cards with special abilities and enchantments.

## Game Mechanics

### Resources
- Players start with a set number of coins
- Coins can be spent to purchase cards and enchantments
- Starting deck provided to each player

### Card Types
1. **Standard Cards**: Basic playing cards
2. **Jokers**: Special cards with unique abilities
3. **Enchantments**: Modifications that can be applied to cards or played as standalone effects

### Display Areas
- 5 Standard cards available for purchase
- 3 Joker cards available for purchase
- 3 Enchantment cards available for purchase

### Player Actions
- Purchase cards from any display area
- Play cards from hand
- Apply enchantments to cards
- Use card abilities

## Implementation

### Game State
- Tracks player resources (coins)
- Manages multiple draw sources
- Handles card enchantments and modifications

### Player Management
- Supports 2+ players
- Tracks individual player:
  - Coins
  - Hand
  - Deck
  - Play area

### Card Effects
- Cards can be enhanced with enchantments
- Effects can modify:
  - Card values
  - Card suits
  - Card abilities
  - Card triggers

## Development Guidelines
1. Keep card effects modular
2. Maintain clear separation between game logic and UI
3. Support future expansion of card types
4. Enable easy addition of new enchantments 