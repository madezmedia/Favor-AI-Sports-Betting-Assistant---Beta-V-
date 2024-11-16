import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import ProtectedRoute from '@/components/auth/protected-route';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import Landing from '@/pages/landing';
import Dashboard from '@/pages/dashboard';
import Teams from '@/pages/teams';
import TeamPage from '@/pages/team/[id]';
import Players from '@/pages/players';
import Settings from '@/pages/settings';
import Sportsbooks from '@/pages/sportsbooks';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
      
      {/* Protected Routes */}
      <Route path="/app" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:id" element={<TeamPage />} />
        <Route path="players" element={<Players />} />
        <Route path="sportsbooks" element={<Sportsbooks />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}