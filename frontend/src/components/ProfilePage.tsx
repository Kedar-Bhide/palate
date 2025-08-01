'use client';

import { CuisineLog, UserStats } from '@/types';
import { CalendarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ProfilePageProps {
  logs: CuisineLog[];
  stats: UserStats;
}

export default function ProfilePage({ logs, stats }: ProfilePageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Culinary Journey</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="w-5 h-5 text-orange-500" />
            <span className="text-lg font-medium">{stats.total_cuisines}</span>
            <span className="text-gray-600">cuisines explored</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-orange-500" />
            <span className="text-lg font-medium">{logs.length}</span>
            <span className="text-gray-600">total logs</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Recent Cuisine Logs</h3>
        </div>
        
        {logs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No cuisine logs yet. Start by logging your first cuisine!
          </div>
        ) : (
          <div className="divide-y">
            {logs.map((log) => (
              <div key={log.id} className="p-6 hover:bg-gray-50">
                <div className="flex gap-4">
                  <Image
                    src={log.photo_url}
                    alt={log.cuisines?.length ? log.cuisines.map(c => c.name).join(', ') : 'Food photo'}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <h4 className="text-lg font-medium text-gray-900">
                        {log.cuisines?.length ? log.cuisines.map(c => c.name).join(', ') : 'Mixed Cuisines'}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {log.cuisines?.map((cuisine) => (
                        <span 
                          key={cuisine.id}
                          className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                        >
                          {cuisine.category}
                        </span>
                      )) || (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          Legacy Entry
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(log.created_at.toString())}
                    </p>
                    {log.caption && (
                      <p className="text-gray-700">{log.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}