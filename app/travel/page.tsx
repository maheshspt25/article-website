import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { Compass } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Travel Guides & Destination Portals 2026',
  description: 'Explore top travel destinations, Tamil Nadu tourism, Kerala backwaters, hill stations, and heritage guides in India.',
  path: '/travel',
});

export default async function TravelPage() {
  const articles = await getLatestArticles('travel', 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ name: 'Travel', url: '/travel' }]} />

      <div className="bg-sky-900 text-white rounded-2xl p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs px-3 py-1 rounded-full font-semibold">
          <Compass className="w-4 h-4 text-sky-400" />
          Indian Destination & Heritage Hub
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">Travel & Local Guides</h1>
        <p className="text-xs sm:text-sm text-sky-200 max-w-2xl">
          Authentic travel itineraries, state tourism guides, transport schedules, and cultural heritage locations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
