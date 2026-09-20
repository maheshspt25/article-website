import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import AdSlot from '@/components/AdSlot';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { Cpu, Smartphone, Bot, Code, Laptop } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Technology News, Smartphone Comparisons & AI Tools 2026',
  description: 'In-depth mobile specs comparisons (iPhone vs Samsung), top Generative AI software, Android 15 features, and coding tutorials.',
  path: '/technology',
});

export default async function TechnologyHubPage() {
  const articles = await getLatestArticles('technology', 15);

  const subCategories = [
    { name: 'Mobile', href: '/technology/mobile' },
    { name: 'AI Tools', href: '/technology/ai' },
    { name: 'Apps', href: '/technology/apps' },
    { name: 'Software', href: '/technology/software' },
    { name: 'Programming', href: '/technology/programming' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Technology', url: '/technology' }]} />

      <div className="bg-white text-stone-900 rounded-2xl p-6 sm:p-8 space-y-4 border border-stone-200/90 shadow-xs">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 text-xs px-3 py-1 rounded-full font-semibold">
          <Cpu className="w-4 h-4 text-amber-600" />
          Tech &amp; Hardware Review Desk
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900">Technology &amp; Innovation</h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed font-medium">
          Detailed product comparisons, artificial intelligence software reviews, operating system updates, and developer guides.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {subCategories.map((sub) => (
            <Link
              key={sub.name}
              href={sub.href}
              className="bg-stone-50 hover:bg-amber-50/60 text-stone-700 hover:text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border border-stone-200/80 hover:border-amber-300 shadow-xs"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Latest Technology Articles & Mobile Comparisons</h2>
          <span className="text-xs text-slate-500 font-medium">{articles.length} Guides</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>

        {/* <AdSlot slotId="tech-listing-ad" /> */}
      </div>
    </div>
  );
}
