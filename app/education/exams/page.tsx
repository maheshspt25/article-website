import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Competitive Exams Preparation & Pattern 2026',
  description: 'Preparation strategies, high-yield topics, syllabus weightage for JEE Main, NEET UG, GATE, and CAT.',
  path: '/education/exams',
});

export default async function ExamsPage() {
  const articles = await getLatestArticles('education', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Education', url: '/education' },
        { name: 'Exams', url: '/education/exams' }
      ]} />

      <div className="bg-indigo-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Competitive Exams Blueprint</h1>
        <p className="text-xs sm:text-sm text-indigo-200 mt-1">Syllabus breakdown, weightage analysis, and study plans for national entrance tests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
