import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Government Financial Schemes & Subsidy Portals',
  description: 'PM Kisan Samman Nidhi, Atal Pension Yojana (APY), Sukanya Samriddhi Yojana (SSY), and government subsidies.',
  path: '/finance/government-schemes',
});

export default async function FinanceSchemesPage() {
  const articles = await getLatestArticles('finance', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Finance', url: '/finance' },
        { name: 'Government Schemes', url: '/finance/government-schemes' }
      ]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Central & State Government Financial Schemes</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">PM-Kisan status, Atal Pension Yojana, and social welfare subsidies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
