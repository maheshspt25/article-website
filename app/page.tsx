import React from 'react';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import ArticleCard from '@/components/ArticleCard';
import ToolCard from '@/components/ToolCard';
import AdSlot from '@/components/AdSlot';
import { getLatestArticles, getTools } from '@/lib/queries';
import { Cpu, HelpCircle, Wrench, Wallet, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'InfoMitra - Smart Digital Tools, Expert Guides & Financial Solutions',
  description: 'Explore verified technology reviews, instant loan & tax calculators, step-by-step how-to tutorials, and free online utilities.',
});

export default async function HomePage() {
  const [techArticles, howtoArticles, financeArticles, shoppingArticles, tools] = await Promise.all([
    getLatestArticles('technology', 3),
    getLatestArticles('how-to', 3),
    getLatestArticles('finance', 3),
    getLatestArticles('shopping', 3),
    getTools(),
  ]);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section Banner */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-3.5 py-1 rounded-full text-xs font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            100% Verified Digital Knowledge & Utility Hub
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
            Smart Knowledge & Instant Tools for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600">
              Tech, Finance & Everyday Decisions
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Explore expert technology reviews, instant loan & tax calculators, step-by-step how-to tutorials, and free online utilities — zero sign-up required.
          </p>

          {/* Search Box Component */}
          <div className="pt-2">
            <SearchBox placeholder="Search tools, calculators, tech reviews, and practical guides" size="lg" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Useful Tools Section */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                <Wrench className="w-6 h-6 text-sky-400" />
                Essential Web Utilities & Calculators
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">Fast, 100% free client-side calculators and file tools. Zero registration needed.</p>
            </div>
            <Link
              href="/tools"
              className="text-xs font-bold text-sky-400 hover:underline flex items-center gap-1"
            >
              Explore All 14 Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.slice(0, 8).map((tool) => (
              <ToolCard key={tool.id || tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Ad Slot Placeholder */}
        <AdSlot slotId="homepage-top-ad" />

        {/* Finance Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Wallet className="w-6 h-6 text-blue-600" />
                Finance, Income Tax & Wealth Planning
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">Income Tax regime breakdowns, PM-Kisan status, FD rates, and mutual fund SIP guides.</p>
            </div>
            <Link
              href="/finance"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Explore Finance <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financeArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Shopping Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
                Shopping & Product Reviews
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">Laptops, electronics, and festival buying guides.</p>
            </div>
            <Link
              href="/shopping"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Explore Shopping <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shoppingArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Technology & How-To Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Technology Column */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                Technology & Mobile Comparisons
              </h2>
              <Link href="/technology" className="text-xs font-bold text-blue-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {techArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          {/* How-To Column */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Practical Step-by-Step Tutorials
              </h2>
              <Link href="/how-to" className="text-xs font-bold text-blue-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {howtoArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
