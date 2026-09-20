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

      <div className="bg-white text-slate-900 border border-slate-200/80 rounded-xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200/80 text-xs px-3 py-1 rounded-md font-semibold">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          Academic & Career Desk
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">Education & Scholarships</h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-normal">
          Comprehensive updates on national student scholarships, entrance examination blueprints, free online courses, and college guides.
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
