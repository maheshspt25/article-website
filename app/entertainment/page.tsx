import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { Film } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Entertainment, OTT Releases & Cinema Reviews',
  description: 'Latest OTT release dates, movie reviews, and entertainment updates.',
  path: '/entertainment',
});

export default async function EntertainmentPage() {
  const articles = await getLatestArticles('entertainment', 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ name: 'Entertainment', url: '/entertainment' }]} />

      <div className="bg-purple-900 text-white rounded-2xl p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs px-3 py-1 rounded-full font-semibold">
          <Film className="w-4 h-4 text-purple-400" />
          Cinema & OTT Review Desk
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">Entertainment & OTT Releases</h1>
        <p className="text-xs sm:text-sm text-purple-200 max-w-2xl">
          Weekly streaming calendars, box office insights, and verified film reviews.
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
