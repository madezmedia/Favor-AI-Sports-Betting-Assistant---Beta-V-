import { Game } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {format(new Date(game.date), 'MMM d, yyyy')}
          </span>
          <Badge variant="secondary">
            O/U {game.overUnder}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img 
                src={game.homeTeam.logo} 
                alt={game.homeTeam.displayName}
                className="w-8 h-8 object-contain"
              />
              <div>
                <span className="font-semibold">{game.homeTeam.displayName}</span>
                <Badge variant="outline" className="ml-2">
                  {game.homeSpread > 0 ? '+' : ''}{game.homeSpread}
                </Badge>
              </div>
            </div>
            <span className="text-sm font-mono">
              {game.homeOdds > 0 ? '+' : ''}{game.homeOdds}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img 
                src={game.awayTeam.logo} 
                alt={game.awayTeam.displayName}
                className="w-8 h-8 object-contain"
              />
              <div>
                <span className="font-semibold">{game.awayTeam.displayName}</span>
                <Badge variant="outline" className="ml-2">
                  {game.awaySpread > 0 ? '+' : ''}{game.awaySpread}
                </Badge>
              </div>
            </div>
            <span className="text-sm font-mono">
              {game.awayOdds > 0 ? '+' : ''}{game.awayOdds}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}