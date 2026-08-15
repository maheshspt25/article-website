import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import AdSlot from '@/components/AdSlot';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { Wallet, ShieldAlert, FileText, PiggyBank, Landmark } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Finance & Income Tax Slabs, Loans & Govt Schemes 2026',
  description: 'New Tax Regime vs Old Tax Regime FY 2026-27 breakdown, PM Kisan status check, Fixed Deposit rates, and SIP calculators.',
  path: '/finance',
});

export default async function FinanceHubPage() {
  const articles = await getLatestArticles('finance', 15);

  const subCategories = [
    { name: 'Tax', href: '/finance/tax' },
    { name: 'Loans', href: '/finance/loans' },
    { name: 'Savings', href: '/finance/savings' },
    { name: 'Government Schemes', href: '/finance/government-schemes' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Finance', url: '/finance' }]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs px-3 py-1 rounded-full font-semibold">
          <Wallet className="w-4 h-4 text-blue-400" />
          Financial & Tax Information Desk
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">Finance & Government Schemes</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Verified guides on Income Tax slabs, PM Kisan Samman Nidhi, bank fixed deposit interest rates, and mutual fund investment strategies.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {subCategories.map((sub) => (
            <Link
              key={sub.name}
              href={sub.href}
              className="bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-slate-700"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block mb-0.5">Financial Information Disclaimer:</strong>
          Articles in this section provide educational and general informational summaries based on official notifications. They do not constitute personalized financial advice.
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Latest Tax & Scheme Guides</h2>
          <span className="text-xs text-slate-500 font-medium">{articles.length} Guides</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>

        {/* <AdSlot slotId="finance-listing-ad" /> */}
      </div>
    </div>
  );
}
