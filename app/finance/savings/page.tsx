import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Fixed Deposit (FD) Rates & Mutual Fund SIP Investments',
  description: 'Compare high-yield FD interest rates across public and private banks, PPF, and mutual fund SIP returns.',
  path: '/finance/savings',
});

export default async function FinanceSavingsPage() {
  const articles = await getLatestArticles('finance', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Finance', url: '/finance' },
        { name: 'Savings', url: '/finance/savings' }
      ]} />

      <div className="bg-blue-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Fixed Deposits & Mutual Fund Savings</h1>
        <p className="text-xs sm:text-sm text-blue-200 mt-1">Bank FD rates, Public Provident Fund (PPF), and SIP mutual fund guides.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
