import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Windows 11 Troubleshooting & Speed Up Guides',
  description: 'How to fix Windows 11 Blue Screen BSOD errors, speed up boot time, and optimize RAM usage.',
  path: '/how-to/windows',
});

export default async function HowToWindowsPage() {
  const articles = await getLatestArticles('how-to', 100, 'windows');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'How-To', url: '/how-to' },
        { name: 'Windows', url: '/how-to/windows' }
      ]} />

      <div className="bg-blue-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Windows 11 & Windows 10 Solutions</h1>
        <p className="text-xs sm:text-sm text-blue-200 mt-1">Registry tweaks, system repair commands, and performance optimizations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
