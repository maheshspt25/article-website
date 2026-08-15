import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'PC Software, Free Open Source Tools & Utilities',
  description: 'Must-have Windows & Linux desktop software, photo editors, video converters, and open-source tools.',
  path: '/technology/software',
});

export default async function TechSoftwarePage() {
  const articles = await getLatestArticles('technology', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Technology', url: '/technology' },
        { name: 'Software', url: '/technology/software' }
      ]} />

      <div className="bg-blue-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Desktop Software & Open-Source Utilities</h1>
        <p className="text-xs sm:text-sm text-blue-200 mt-1">Recommended desktop applications for Windows, macOS, and Linux.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
