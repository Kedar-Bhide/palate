'use client';

import { useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/components/LoginPage';
import HomePage from '@/components/HomePage';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return <HomePage />;
}