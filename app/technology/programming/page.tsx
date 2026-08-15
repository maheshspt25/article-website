import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Programming Tutorials, Python, JavaScript & Web Dev Guides',
  description: 'Learn Python, JavaScript, TypeScript, React, Next.js, SQL, and backend API architecture.',
  path: '/technology/programming',
});

export default async function TechProgrammingPage() {
  const articles = await getLatestArticles('technology', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Technology', url: '/technology' },
        { name: 'Programming', url: '/technology/programming' }
      ]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Software Development & Coding Tutorials</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Programming language roadmaps, algorithms, and full-stack web development tutorials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
