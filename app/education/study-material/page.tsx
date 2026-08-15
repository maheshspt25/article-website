import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Free Study Material, Notes & Question Papers',
  description: 'Download chapter-wise revision notes, previous year question papers (PYQs), and mock test solutions.',
  path: '/education/study-material',
});

export default async function StudyMaterialPage() {
  const articles = await getLatestArticles('education', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Education', url: '/education' },
        { name: 'Study Material', url: '/education/study-material' }
      ]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Study Resources & Question Papers</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">High-yield revision notes, formula sheets, and solved PYQ sets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
