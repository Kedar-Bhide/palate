'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';
import { CuisineLog, UserStats } from '@/types';
import Header from './Header';
import LogCuisineModal from './LogCuisineModal';
import ProfilePage from './ProfilePage';
import LoadingSpinner from './LoadingSpinner';

export default function HomePage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<CuisineLog[]>([]);
  const [stats, setStats] = useState<UserStats>({ total_cuisines: 0 });
  const [showLogModal, setShowLogModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await apiClient.get('/cuisines/logs');
      setLogs(response.logs as unknown as CuisineLog[]);
      setStats(response.stats as unknown as UserStats);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogSuccess = () => {
    setShowLogModal(false);
    fetchUserData();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogCuisineClick={() => setShowLogModal(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {logs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome to Palate, {user?.displayName?.split(' ')[0]}!
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your food journey starts now
            </p>
            <button
              onClick={() => setShowLogModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
            >
              Log Your First Cuisine
            </button>
          </div>
        ) : (
          <ProfilePage logs={logs} stats={stats} />
        )}
      </main>

      {showLogModal && (
        <LogCuisineModal
          isOpen={showLogModal}
          onClose={() => setShowLogModal(false)}
          onSuccess={handleLogSuccess}
        />
      )}
    </div>
  );
}