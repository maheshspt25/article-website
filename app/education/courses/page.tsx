import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Top Online Courses & Skill Certifications 2026',
  description: 'Free online courses with certificates in programming, data science, digital marketing, and engineering.',
  path: '/education/courses',
});

export default async function CoursesPage() {
  const articles = await getLatestArticles('education', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Education', url: '/education' },
        { name: 'Courses', url: '/education/courses' }
      ]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Courses & Skill Certifications</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Recommended free and university-accredited online learning programs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
