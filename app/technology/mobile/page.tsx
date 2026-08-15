import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Mobile Reviews, Smartphone Specs & Camera Comparisons 2026',
  description: 'Flagship smartphone reviews, iPhone vs Samsung Galaxy specs tables, camera benchmarks, and battery endurance tests.',
  path: '/technology/mobile',
});

export default async function TechMobilePage() {
  const articles = await getLatestArticles('technology', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Technology', url: '/technology' },
        { name: 'Mobile', url: '/technology/mobile' }
      ]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Mobile Phones & Smartphone Reviews</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Detailed head-to-head comparisons, spec sheets, and buying advice.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
