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

      <div className="bg-white text-stone-900 border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 text-xs px-3 py-1 rounded-full font-semibold">
          <Compass className="w-4 h-4 text-amber-600" />
          Indian Destination &amp; Heritage Hub
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900">Travel &amp; Local Guides</h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl font-medium leading-relaxed">
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
