'use client';

import dynamic from 'next/dynamic';

// Dynamically import the client component to prevent SSR issues
const AppContent = dynamic(() => import('@/components/AppContent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
    </div>
  ),
});

export default function Page() {
  return <AppContent />;
}
