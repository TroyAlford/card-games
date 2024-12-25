# Card Games Server

A Bun-based server implementation for hosting card games, designed to be containerized and scalable.

## Architecture

### Server Components
- **Server**: Core server implementation
  - Request handling
  - WebSocket management
  - Game state synchronization
- **Game Manager**: Handles active games
  - Game creation
  - Player joining/leaving
  - State persistence

### Key Features
- Built with Bun for optimal performance
- Docker containerization support
- WebSocket-based real-time communication
- Game state persistence

## Implementation Details

### Server Configuration

<code>
interface ServerConfig {
  port: number
  hostname: string
  corsOrigins?: string[]
  maxGames?: number
}
</code>

### Game Session Management

<code>
interface GameSession {
  id: string
  gameType: string
  players: Player[]
  state: GameState
  created: Date
  lastActive: Date
}
</code>

### WebSocket Protocol

<code>
interface WSMessage {
  type: 'join' | 'leave' | 'action' | 'sync'
  gameId: string
  playerId: string
  payload: any
}
</code>

## Deployment

### Docker Support
- Containerized for easy deployment
- Environment variable configuration
- Volume mounting for persistence
- Health check endpoints

### Development Setup
1. Install dependencies: `bun install`
2. Start development server: `bun run develop`
3. Build for production: `bun run build`
4. Run tests: `bun test`

## Development Guidelines
1. Use Bun's native features when possible
2. Maintain WebSocket connection stability
3. Implement proper error handling
4. Keep game state in memory with persistence backup
5. Follow REST principles for HTTP endpoints
6. Document all APIs and WebSocket messages 