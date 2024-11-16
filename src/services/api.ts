import axios from 'axios';
import { NBATeam } from '../types';

const API_KEY = 'f9f7f7f863msh3a208f1bb0603b3p1c71bdjsnebdade6a80c8';
const API_HOST = 'nba-api-free-data.p.rapidapi.com';

const api = axios.create({
  baseURL: 'https://nba-api-free-data.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
  },
});

export const fetchNBATeams = async (): Promise<NBATeam[]> => {
  const { data } = await api.get('/nba-team-list');
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
};