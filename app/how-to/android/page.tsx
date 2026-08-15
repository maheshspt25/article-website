import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Android Troubleshooting, Battery Fixes & Tutorials',
  description: 'How to fix Android battery drain, speed up performance, clear system cache, and manage app permissions.',
  path: '/how-to/android',
});

export default async function HowToAndroidPage() {
  const articles = await getLatestArticles('how-to', 100, 'android');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'How-To', url: '/how-to' },
        { name: 'Android', url: '/how-to/android' }
      ]} />

      <div className="bg-emerald-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Android Guides & Troubleshooting</h1>
        <p className="text-xs sm:text-sm text-emerald-200 mt-1">Practical battery, performance, and security solutions for Android phones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
