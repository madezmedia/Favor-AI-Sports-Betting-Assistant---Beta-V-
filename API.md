## API Documentation

### NBA API Integration

#### Endpoints

1. Teams List
```typescript
GET /nba-team-list
Headers:
  x-rapidapi-key: ${API_KEY}
  x-rapidapi-host: nba-api-free-data.p.rapidapi.com

Response:
{
  teams: Array<{
    id: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    location: string;
    color: string;
    alternateColor: string;
    logo: string;
  }>
}
```

2. Games Data
```typescript
interface Game {
  id: string;
  date: string;
  homeTeam: NBATeam;
  awayTeam: NBATeam;
  homeSpread: number;
  awaySpread: number;
  homeOdds: number;
  awayOdds: number;
  overUnder: number;
}
```

### OpenRouter AI Integration

#### Endpoints

1. Analysis Request
```typescript
POST /chat
Headers:
  Authorization: Bearer ${API_KEY}
  Content-Type: application/json

Body:
{
  model: "anthropic/claude-3-haiku",
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>
}

Response:
{
  choices: Array<{
    message: {
      content: string;
    }
  }>
}
```

### Error Handling

```typescript
interface APIError {
  status: number;
  message: string;
  code: string;
}

// Example error response
{
  status: 429,
  message: "Rate limit exceeded",
  code: "RATE_LIMIT"
}
```

### Rate Limits

- NBA API: 100 requests per minute
- OpenRouter: 60 requests per minute

### Caching Strategy

```typescript
// Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});
```

### WebSocket Integration (Future)

```typescript
interface WebSocketMessage {
  type: 'odds_update' | 'line_movement' | 'injury_update';
  data: unknown;
  timestamp: string;
}
```

### Authentication

```typescript
// Clerk configuration
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Protected route example
<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
  <ProtectedRoute>
    <Component />
  </ProtectedRoute>
</ClerkProvider>
```