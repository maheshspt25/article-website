import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import { ShieldCheck, Users } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'About InfoMitra Information Portal',
  description: 'Learn about InfoMitra\'s mission to provide verified Indian tech comparisons, practical guides, financial resources, and utility tools.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'About Us', url: '/about' }]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold">About InfoMitra</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          India&apos;s leading SEO-first information platform delivering verified tech comparisons, practical guides, financial resources, and utility tools.
        </p>
      </div>

      <div className="article-prose bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2>Our Mission</h2>
        <p>
          InfoMitra was built to solve a major problem on the Indian web: noisy, keyword-stuffed clickbait sites that duplicate outdated notices and present fake information to readers.
        </p>
        <p>
          Our platform prioritizes <strong>user experience, strict editorial verification, dynamic SEO architecture, and high performance</strong>. Every indexed page provides real value, whether it is a product comparison, a step-by-step tech solution, or an instant client-side calculator.
        </p>

        <h2>Core Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600" /> Reference Citations &amp; Documentation
            </h3>
            <p className="text-xs text-slate-600">All published guides cite official documentation and primary reference sources.</p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600" /> User First, SEO Second
            </h3>
            <p className="text-xs text-slate-600">We do not auto-generate thin pages or spam search engines with unverified content.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
