import { useNBATeams } from '@/hooks/useNBAData';
import { TeamCard } from './team-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export function TeamsGrid() {
  const { data: teams, isLoading, error } = useNBATeams();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load teams. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!teams?.length) {
    return (
      <Alert>
        <AlertDescription>
          No teams found.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-12rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
        {teams.map((team) => (
          <TeamCard 
            key={team.id} 
            team={team} 
            className="bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/80"
          />
        ))}
      </div>
    </ScrollArea>
  );
}