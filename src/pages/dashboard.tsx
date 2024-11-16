import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GamesOverview } from '@/components/dashboard/games-overview';
import { BettingInsights } from '@/components/dashboard/betting-insights';
import { TeamStats } from '@/components/dashboard/team-stats';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fetchNBATeams } from '@/lib/api';

export default function Dashboard() {
  const { data: teams, isError } = useQuery({
    queryKey: ['nbaTeams'],
    queryFn: fetchNBATeams,
  });

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load dashboard data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-5rem)]">
      <div className="space-y-8 pb-8">
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">NBA Analytics Dashboard</h2>
            <p className="text-muted-foreground">
              Track odds, analyze trends, and make informed betting decisions.
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Games Overview</TabsTrigger>
            <TabsTrigger value="insights">Betting Insights</TabsTrigger>
            <TabsTrigger value="stats">Team Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <GamesOverview />
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <BettingInsights />
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-4">
            <TeamStats teams={teams || []} />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}