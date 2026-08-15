import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Government & Private Student Scholarships 2026',
  description: 'National Means Cum Merit Scholarship (NMMS), NSP Central Sector Scheme, and merit scholarships for school and college students.',
  path: '/education/scholarships',
});

export default async function ScholarshipsPage() {
  const articles = await getLatestArticles('education', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Education', url: '/education' },
        { name: 'Scholarships', url: '/education/scholarships' }
      ]} />

      <div className="bg-blue-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Government & Merit Scholarships</h1>
        <p className="text-xs sm:text-sm text-blue-200 mt-1">National Scholarship Portal (NSP) schemes, eligibility, and online application guidelines.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
