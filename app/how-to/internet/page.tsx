import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Home Wi-Fi, Internet Speed & Broadband Fixes',
  description: 'How to speed up Wi-Fi connection, configure DNS settings, change router passwords, and fix DNS errors.',
  path: '/how-to/internet',
});

export default async function HowToInternetPage() {
  const articles = await getLatestArticles('how-to', 100, 'internet');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'How-To', url: '/how-to' },
        { name: 'Internet', url: '/how-to/internet' }
      ]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Internet & Network Troubleshooting</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Solutions for Wi-Fi speed, router configuration, and browser cache errors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
