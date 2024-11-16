## Contributing to Favor NBA Analytics Dashboard

Thank you for your interest in contributing to Favor! This document provides guidelines and information for developers.

### Tech Stack

- **Frontend:**
  - React 18.3+ with TypeScript
  - Vite for build tooling
  - TanStack Query for data fetching and caching
  - Tailwind CSS for styling
  - Radix UI primitives with shadcn/ui components
  - Recharts for data visualization
  - Clerk for authentication

- **API Integration:**
  - NBA API (RapidAPI)
  - OpenRouter API for AI analysis

### Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── dashboard/     # Dashboard-specific components
│   ├── games/        # Game-related components
│   ├── teams/        # Team-related components
│   ├── ui/           # Base UI components
│   └── layouts/      # Layout components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and API clients
├── pages/            # Route components
├── services/         # API service layers
└── types/            # TypeScript type definitions
```

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in required API keys:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   VITE_NBA_API_KEY=your_nba_api_key
   VITE_OPENROUTER_API_KEY=your_openrouter_key
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

### Development Guidelines

#### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use functional components with hooks
- Implement proper error boundaries
- Write meaningful component and function names

#### Component Guidelines

- Keep components small and focused
- Use composition over inheritance
- Implement proper prop typing
- Use React.memo() for performance optimization when needed
- Implement loading and error states

#### State Management

- Use React Query for server state
- Implement proper caching strategies
- Use local state for UI-only state
- Consider using context for theme/auth state

### Testing Strategy

- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for critical user flows
- E2E tests with Cypress for core features

### Roadmap

#### Phase 1 (Current)
- [x] Basic dashboard layout
- [x] NBA teams integration
- [x] Games overview
- [x] Basic betting insights
- [x] Team statistics

#### Phase 2 (Next Sprint)
- [ ] Real-time odds tracking
- [ ] Line movement charts
- [ ] Public betting percentages
- [ ] Sharp money indicators
- [ ] Advanced team statistics

#### Phase 3 (Future)
- [ ] AI-powered predictions
- [ ] Custom alerts system
- [ ] Historical trends analysis
- [ ] Mobile app development
- [ ] Social features

### Performance Considerations

1. Data Fetching
   - Implement proper caching strategies
   - Use pagination for large datasets
   - Optimize API calls

2. Rendering
   - Implement virtualization for long lists
   - Use React.memo() for expensive components
   - Optimize images and assets

3. Bundle Size
   - Code splitting by route
   - Lazy loading of components
   - Tree shaking unused code

### Security Considerations

1. Authentication
   - Clerk handles user authentication
   - Implement proper role-based access
   - Secure API endpoints

2. Data Protection
   - Sanitize user inputs
   - Implement rate limiting
   - Secure sensitive data

3. API Security
   - Hide API keys in environment variables
   - Implement proper CORS policies
   - Use HTTPS for all requests

### Deployment

1. Production Build
   ```bash
   npm run build
   ```

2. Deployment Platforms
   - Netlify (current)
   - Vercel (alternative)
   - AWS (future consideration)

### Known Issues

1. Performance
   - Large bundle size needs optimization
   - API response times can be improved
   - Memory usage optimization needed

2. Features
   - Limited historical data
   - Basic betting insights
   - Missing real-time updates

### Next Steps

1. Immediate Priorities
   - Implement real-time odds tracking
   - Add line movement visualization
   - Enhance betting insights
   - Improve error handling

2. Technical Debt
   - Optimize bundle size
   - Improve test coverage
   - Refactor API integration
   - Enhance type safety

3. Future Enhancements
   - Mobile responsiveness
   - Offline support
   - Push notifications
   - Social features

### Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

### License

This project is licensed under the MIT License - see the LICENSE file for details.