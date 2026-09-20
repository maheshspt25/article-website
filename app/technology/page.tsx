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

      <div className="bg-white text-slate-900 rounded-xl p-6 sm:p-8 space-y-4 border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200/80 text-xs px-3 py-1 rounded-md font-semibold">
          <Cpu className="w-4 h-4 text-blue-600" />
          Tech & Hardware Review Desk
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Technology & Innovation</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-normal">
          Detailed product comparisons, artificial intelligence software reviews, operating system updates, and developer guides.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {subCategories.map((sub) => (
            <Link
              key={sub.name}
              href={sub.href}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-blue-600 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border border-slate-200/80 shadow-xs"
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
