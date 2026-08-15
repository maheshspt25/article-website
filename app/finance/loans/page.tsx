import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Home Loan, Car Loan & Personal Loan Interest Rates',
  description: 'Compare bank interest rates for home loans, personal loans, and education loans with EMI calculators.',
  path: '/finance/loans',
});

export default async function FinanceLoansPage() {
  const articles = await getLatestArticles('finance', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Finance', url: '/finance' },
        { name: 'Loans', url: '/finance/loans' }
      ]} />

      <div className="bg-emerald-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Bank Loans & Credit Interest Rates</h1>
        <p className="text-xs sm:text-sm text-emerald-200 mt-1">Home loan, personal loan, and collateral-free education loan guides.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
