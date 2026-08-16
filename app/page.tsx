import React from 'react';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import ArticleCard from '@/components/ArticleCard';
import ToolCard from '@/components/ToolCard';
import AdSlot from '@/components/AdSlot';
import { getLatestArticles, getTools } from '@/lib/queries';
import { Cpu, HelpCircle, Wrench, Wallet, HeartPulse, ArrowRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'InfoMitra - Smart Digital Tools, Health Guides & Financial Solutions',
  description: 'Explore verified technology benchmarks, ICMR health guidelines, instant loan & tax calculators, step-by-step how-to tutorials, and free online utilities.',
});

export default async function HomePage() {
  const [techArticles, howtoArticles, financeArticles, healthArticles, tools] = await Promise.all([
    getLatestArticles('technology', 3),
    getLatestArticles('how-to', 3),
    getLatestArticles('finance', 3),
    getLatestArticles('health', 3),
    getTools(),
  ]);

  const categoryPills = [
    { label: '🛠️ Free Web Utilities', href: '/tools', badge: '14 Tools' },
    { label: '💰 Income Tax & Finance', href: '/finance', badge: 'Tax & EPF' },
    { label: '🏥 ICMR Health & Fitness', href: '/health', badge: 'WHO Guides' },
    { label: '💻 Tech & Mobile Optics', href: '/technology', badge: 'Hardware Specs' },
    { label: '📚 Step-by-Step Tutorials', href: '/how-to', badge: 'Guides' },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section Banner */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-3.5 py-1 rounded-full text-xs font-bold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Practical Digital Guides, Tools & Information
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
            Smart Knowledge & Instant Tools for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600">
              Tech, Finance, Health & Everyday Decisions
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Explore expert technology benchmarks, ICMR dietary guidelines, instant tax & EMI calculators, step-by-step how-to tutorials, and free online utilities — 100% free with zero sign-up required.
          </p>

          {/* Search Box Component */}
          <div className="pt-2 max-w-2xl mx-auto">
            <SearchBox placeholder="Search tools, calculators, tech reviews, ICMR health guides..." size="lg" />
          </div>

          {/* Quick Category Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categoryPills.map((pill, idx) => (
              <Link
                key={idx}
                href={pill.href}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs"
              >
                <span>{pill.label}</span>
                <span className="bg-slate-100 group-hover:bg-blue-100 text-slate-600 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {pill.badge}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Useful Tools Section */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles className="w-48 h-48 text-sky-400" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <h2 className="text-2xl font-extrabold flex items-center gap-2 text-white">
                <Wrench className="w-6 h-6 text-sky-400" />
                Essential Web Utilities & Calculators
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">Fast, 100% free client-side calculators and file tools. Zero registration required.</p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700"
            >
              Explore All 25 Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {tools.slice(0, 8).map((tool) => (
              <ToolCard key={tool.id || tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Finance Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <Wallet className="w-6 h-6 text-blue-600" />
                Finance, Income Tax & Wealth Planning
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">New vs Old Income Tax Slabs, EPF 8.25%, PPF 7.10%, CIBIL 750+, and RBI Repo Rate guides.</p>
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

        {/* Health & Wellness Section */}
        <section className="bg-gradient-to-r from-rose-50/70 via-slate-50 to-pink-50/50 rounded-3xl p-6 sm:p-8 border border-rose-100/80 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                <HeartPulse className="w-6 h-6 text-rose-600" />
                Health, Exercise & ICMR Dietary Guidelines
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">Evidence-based fitness habits, ICMR dietary guidelines, exercise intensity, and sleep hygiene.</p>
            </div>
            <Link
              href="/health"
              className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1"
            >
              Explore Health <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthArticles.map((article) => (
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
                Technology & Hardware Benchmarks
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
