import { useQuery } from '@tanstack/react-query';
import { fetchNBATeams } from '@/lib/data';

export function useNBATeams() {
  return useQuery({
    queryKey: ['nbaTeams'],
    queryFn: fetchNBATeams,
    staleTime: 1000 * 60 * 60, // Consider data fresh for 1 hour
  });
}