import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { ShoppingBag } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Shopping Guides, Product Comparisons & Buying Reviews',
  description: 'Unbiased product buying guides, laptop comparisons, festival sale dates, and gadget recommendations.',
  path: '/shopping',
});

export default async function ShoppingPage() {
  const articles = await getLatestArticles('shopping', 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ name: 'Shopping', url: '/shopping' }]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs px-3 py-1 rounded-full font-semibold">
          <ShoppingBag className="w-4 h-4 text-blue-400" />
          Product Reviews & Buying Desk
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">Shopping & Product Buying Guides</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Curated product comparisons and online shopping advice with verified specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
