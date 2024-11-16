import { NBATeam } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { getTeamDetailsByAnyId } from '@/lib/team-mappings';

interface TeamCardProps {
  team: NBATeam;
  className?: string;
}

export function TeamCard({ team, className }: TeamCardProps) {
  const { nbaApiId } = getTeamDetailsByAnyId(team.id);

  return (
    <Link to={`/app/teams/${nbaApiId}`}>
      <Card className={cn("group hover:shadow-lg transition-all", className)}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
              <img
                src={team.logo}
                alt={team.displayName}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{team.displayName}</h3>
              <p className="text-sm text-muted-foreground">{team.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}