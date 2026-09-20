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
      <section className="bg-gradient-to-b from-[#F5F0E8] via-[#FAF8F5] to-[#FAF8F5] text-stone-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-stone-200/90">
        {/* Subtle Warm Amber Dot Matrix */}
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        {/* Warm Ambient Glow Highlight */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-gradient-to-r from-amber-200/30 via-orange-100/40 to-amber-200/30 blur-3xl pointer-events-none rounded-full"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-50/90 border border-amber-200/80 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Verified Digital Guides, Calculators & Web Utilities</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-stone-900">
            Smart Knowledge & Instant Tools for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-stone-800">
              Tech, Finance, Health & Everyday Decisions
            </span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Explore verified technology benchmarks, ICMR dietary guidelines, instant tax & EMI calculators, step-by-step how-to tutorials, and free online utilities — 100% free with zero sign-up required.
          </p>

          {/* Search Box Component */}
          <div className="pt-2 max-w-2xl mx-auto">
            <SearchBox placeholder="Search tools, calculators, tech reviews, ICMR health guides..." size="lg" />
          </div>

          {/* Quick Category Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {categoryPills.map((pill, idx) => (
              <Link
                key={idx}
                href={pill.href}
                className="group inline-flex items-center gap-1.5 bg-white hover:bg-amber-50/60 border border-stone-200/90 hover:border-amber-300 text-stone-700 hover:text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs"
              >
                <span>{pill.label}</span>
                <span className="bg-stone-100 group-hover:bg-amber-100 text-stone-600 group-hover:text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors">
                  {pill.badge}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Useful Tools Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.07] pointer-events-none text-amber-500">
            <Sparkles className="w-48 h-48" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <h2 className="text-2xl font-extrabold flex items-center gap-2 text-stone-900">
                <Wrench className="w-6 h-6 text-amber-600" />
                Essential Web Utilities & Calculators
              </h2>
              <p className="text-xs text-stone-600 mt-1 font-medium">Fast, 100% free client-side calculators and file tools. Zero registration required.</p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 transition-colors bg-amber-50 hover:bg-amber-100/80 px-3.5 py-1.5 rounded-lg border border-amber-200/80 shadow-xs"
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
              <h2 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
                <Wallet className="w-6 h-6 text-amber-600" />
                Finance, Income Tax & Wealth Planning
              </h2>
              <p className="text-xs text-stone-500 mt-1 font-medium">New vs Old Income Tax Slabs, EPF 8.25%, PPF 7.10%, CIBIL 750+, and RBI Repo Rate guides.</p>
            </div>
            <Link
              href="/finance"
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
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
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
                <HeartPulse className="w-6 h-6 text-rose-600" />
                Health, Exercise & ICMR Dietary Guidelines
              </h2>
              <p className="text-xs text-stone-500 mt-1 font-medium">Evidence-based fitness habits, ICMR dietary guidelines, exercise intensity, and sleep hygiene.</p>
            </div>
            <Link
              href="/health"
              className="text-xs font-semibold text-rose-700 hover:text-rose-800 flex items-center gap-1"
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
              <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-700" />
                Technology & Hardware Benchmarks
              </h2>
              <Link href="/technology" className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline">
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
              <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                Practical Step-by-Step Tutorials
              </h2>
              <Link href="/how-to" className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline">
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
