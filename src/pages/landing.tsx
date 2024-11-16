import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, Shield, Zap } from 'lucide-react';
import { useEffect } from 'react';

export default function Landing() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/app');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 z-0" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 animate-fade-in">
              <span className="text-6xl">🪙</span>
              <h1 className="text-6xl font-bold">Favor</h1>
            </div>
            <p className="text-2xl text-muted-foreground">
              May the odds always be in your Favor
            </p>
            <h2 className="text-4xl font-bold tracking-tight">
              Professional NBA Analytics & Insights
            </h2>
            <p className="text-xl text-muted-foreground">
              Make informed decisions with AI-powered analysis, real-time odds, and expert insights
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/sign-up">
                <Button size="lg" className="text-lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button size="lg" variant="outline" className="text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the landing page content remains the same */}
    </div>
  );
}