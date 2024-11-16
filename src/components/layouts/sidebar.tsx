import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Trophy,
  Settings as SettingsIcon,
  DollarSign,
  Target
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { name: 'Teams', href: '/app/teams', icon: Users },
  { name: 'Players', href: '/app/players', icon: Trophy },
  { name: 'Sportsbooks', href: '/app/sportsbooks', icon: DollarSign },
  { name: 'Settings', href: '/app/settings', icon: SettingsIcon },
];

interface SidebarProps {
  onNavigate?: () => void;
  collapsed?: boolean;
}

export function Sidebar({ onNavigate, collapsed }: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 py-6">
        <nav className="px-2 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground",
                  collapsed && "justify-center px-2"
                )
              }
              title={collapsed ? item.name : undefined}
            >
              <item.icon className={cn(
                "flex-shrink-0",
                collapsed ? "h-5 w-5" : "h-4 w-4"
              )} />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}