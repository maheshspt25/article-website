import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Income Tax Slabs, New vs Old Tax Regime FY 2026-27',
  description: 'Income Tax slab rates for salaried employees, 80C deductions, standard deduction, and ITR filing guides.',
  path: '/finance/tax',
});

export default async function FinanceTaxPage() {
  const articles = await getLatestArticles('finance', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Finance', url: '/finance' },
        { name: 'Tax', url: '/finance/tax' }
      ]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Income Tax Slabs & Tax Saving Guides</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Comparison between New Tax Regime and Old Tax Regime for salaried taxpayers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
