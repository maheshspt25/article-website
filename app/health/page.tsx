import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { HeartPulse, ShieldAlert } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Health, Wellness & Fitness Guidelines',
  description: 'Evidence-based health articles, wellness tips, diet plans, and fitness advice.',
  path: '/health',
});

export default async function HealthPage() {
  const articles = await getLatestArticles('health', 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[{ name: 'Health', url: '/health' }]} />

      <div className="bg-white text-slate-900 border border-slate-200/80 rounded-xl p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 border border-rose-200/80 text-xs px-3 py-1 rounded-md font-semibold">
          <HeartPulse className="w-4 h-4 text-rose-600" />
          Health & Wellness Information Desk
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Health & Fitness</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-normal">
          Fact-checked articles on nutrition, physical fitness, preventative healthcare, and mental wellness.
        </p>
      </div>

      <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block mb-0.5">Medical Information Disclaimer:</strong>
          Health content on InfoMitra is for general educational purposes only and should not replace professional medical advice or diagnosis.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
