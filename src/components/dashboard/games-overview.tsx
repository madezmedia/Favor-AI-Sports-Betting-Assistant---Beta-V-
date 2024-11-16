import { useDailyEvents } from '@/hooks/useEvents';
import { DailyEvents } from './daily-events';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

export function GamesOverview() {
  const { data: events, isLoading, error } = useDailyEvents();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load today's games. Please try again later.
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 text-xs opacity-50">
              Error: {(error as Error).message}
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return <DailyEvents events={events || []} />;
}