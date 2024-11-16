import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { useTheme } from 'next-themes';
import { 
  Menu,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle 
} from '@/components/ui/sheet';
import { Sidebar } from './sidebar';
import { cn } from '@/lib/utils';

export default function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="p-0 w-72 border-r"
          onInteractOutside={() => setIsMobileOpen(false)}
        >
          <SheetHeader className="h-16 px-6 border-b">
            <SheetTitle className="flex items-center">
              <Target className="h-5 w-5 text-primary mr-2" />
              <span className="font-semibold text-lg">Favor</span>
            </SheetTitle>
          </SheetHeader>
          <Sidebar onNavigate={() => setIsMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div 
        className={cn(
          "hidden lg:block fixed inset-y-0 left-0 z-50 border-r bg-card transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b">
          <Target className="h-5 w-5 text-primary" />
          {!isCollapsed && <span className="font-semibold text-lg ml-2">Favor</span>}
        </div>
        <Sidebar collapsed={isCollapsed} />
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 rounded-full border shadow-md bg-background"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div 
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300",
          "lg:pl-64",
          isCollapsed && "lg:pl-16"
        )}
      >
        <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary lg:hidden" />
              <h1 className="text-lg font-semibold">
                May the odds be in your Favor
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <UserButton 
                afterSignOutUrl="/sign-in"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </div>
          </div>
        </header>
        <main className="flex-1 container py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}