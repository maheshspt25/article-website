import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import AdSlot from '@/components/AdSlot';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { GraduationCap, Award, BookOpen, FileCheck } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Education, University Scholarships & Competitive Exam Guides 2026',
  description: 'National Means Cum Merit scholarship (NMMS), JEE Main, NEET UG, GATE, CAT exam preparation, and top online courses.',
  path: '/education',
});

export default async function EducationHubPage() {
  const articles = await getLatestArticles('education', 15);

  const subCategories = [
    { name: 'Scholarships', href: '/education/scholarships' },
    { name: 'Exams', href: '/education/exams' },
    { name: 'Courses', href: '/education/courses' },
    { name: 'Study Material', href: '/education/study-material' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Education', url: '/education' }]} />

      <div className="bg-white text-stone-900 border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 text-xs px-3 py-1 rounded-full font-semibold">
          <GraduationCap className="w-4 h-4 text-amber-600" />
          Academic &amp; Career Desk
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900">Education &amp; Scholarships</h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed font-medium">
          Comprehensive updates on national student scholarships, entrance examination blueprints, free online courses, and college guides.
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
          <h2 className="text-xl font-bold text-slate-900">Latest Academic Guides & Exam Blueprint</h2>
          <span className="text-xs text-slate-500 font-medium">{articles.length} Articles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>

        {/* <AdSlot slotId="education-listing-ad" /> */}
      </div>
    </div>
  );
}
