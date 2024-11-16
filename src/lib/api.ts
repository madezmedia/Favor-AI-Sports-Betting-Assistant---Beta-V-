import axios from 'axios';
import { NBATeam, TeamDetails, Player, DailyEvent } from '@/types';
import { getTeamDetailsByAnyId } from './team-mappings';

const NBA_API_KEY = import.meta.env.VITE_NBA_API_KEY;
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// NBA API client
export const nbaApi = axios.create({
  baseURL: 'https://nba-api-free-data.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': NBA_API_KEY,
    'x-rapidapi-host': 'nba-api-free-data.p.rapidapi.com',
  },
});

// NBA Props API client
export const nbaPropsApi = axios.create({
  baseURL: 'https://nba-player-props-odds.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': NBA_API_KEY,
    'x-rapidapi-host': 'nba-player-props-odds.p.rapidapi.com',
  },
});

// OpenRouter API client
export const aiApi = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Cache for team logos
const logoCache = new Map<string, string>();

export async function fetchTeamLogo(teamId: string): Promise<string> {
  if (logoCache.has(teamId)) {
    return logoCache.get(teamId)!;
  }

  try {
    const { data } = await nbaApi.get('/nba-team-list');
    const team = data.teams.find((t: any) => t.abbreviation === teamId);
    if (team && team.logos?.[0]?.href) {
      logoCache.set(teamId, team.logos[0].href);
      return team.logos[0].href;
    }
    throw new Error('Team logo not found');
  } catch (error) {
    console.error('Error fetching team logo:', error);
    return 'https://a.espncdn.com/i/teamlogos/nba/500/league.png';
  }
}

export async function fetchDailyEvents(): Promise<DailyEvent[]> {
  try {
    const { data } = await nbaPropsApi.get('/get-events-for-date');
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format');
    }

    // Fetch team logos in parallel
    const eventsWithLogos = await Promise.all(
      data.map(async (event) => {
        const [homeLogo, awayLogo] = await Promise.all([
          fetchTeamLogo(event.teams.home.abbreviation),
          fetchTeamLogo(event.teams.away.abbreviation),
        ]);

        return {
          ...event,
          teams: {
            home: {
              ...event.teams.home,
              logo: homeLogo,
            },
            away: {
              ...event.teams.away,
              logo: awayLogo,
            },
          },
        };
      })
    );

    return eventsWithLogos;
  } catch (error) {
    console.error('Error fetching daily events:', error);
    throw error;
  }
}

export async function fetchNBATeams(): Promise<NBATeam[]> {
  const { data } = await nbaApi.get('/nba-team-list');
  return data.teams.map((team: any) => ({
    id: team.id,
    abbreviation: team.abbreviation,
    displayName: team.displayName,
    shortDisplayName: team.shortDisplayName,
    location: team.location,
    color: team.color,
    alternateColor: team.alternateColor,
    logo: team.logos[0].href,
  }));
}

export async function fetchTeamDetails(teamId: string): Promise<TeamDetails> {
  const { data } = await nbaApi.get('/nba-team-info/v1/data', {
    params: { id: teamId },
  });
  return data;
}

export async function fetchTeamPlayers(teamId: string): Promise<Player[]> {
  const { data } = await nbaApi.get('/nba-player-listing/v1/data', {
    params: { id: teamId },
  });
  return data.athletes;
}

export async function getAIAnalysis(prompt: string): Promise<string> {
  const { data } = await aiApi.post('/chat', {
    model: 'anthropic/claude-3-haiku',
    messages: [{ role: 'user', content: prompt }],
  });
  return data.choices[0].message.content;
}