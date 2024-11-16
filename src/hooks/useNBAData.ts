import { useQuery } from '@tanstack/react-query';
import { fetchNBATeams, fetchTeamDetails, fetchTeamPlayers, getAIAnalysis } from '@/lib/api';

export function useNBATeams() {
  return useQuery({
    queryKey: ['nbaTeams'],
    queryFn: fetchNBATeams,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useTeamDetails(teamId: string) {
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: () => fetchTeamDetails(teamId),
    enabled: !!teamId,
  });
}

export function useTeamPlayers(teamId: string) {
  return useQuery({
    queryKey: ['teamPlayers', teamId],
    queryFn: () => fetchTeamPlayers(teamId),
    enabled: !!teamId,
  });
}

export function useAIAnalysis(prompt: string) {
  return useQuery({
    queryKey: ['aiAnalysis', prompt],
    queryFn: () => getAIAnalysis(prompt),
    enabled: !!prompt,
    staleTime: 1000 * 60 * 30, // 30 minutes
    cacheTime: 1000 * 60 * 60, // 1 hour
  });
}