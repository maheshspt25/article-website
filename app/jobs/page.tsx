import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JobCard from '@/components/JobCard';
import LocationCard from '@/components/LocationCard';
import AdSlot from '@/components/AdSlot';
import { getLatestJobs, getActiveLocations } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { Briefcase, Filter, Search } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Government & Private Jobs Notification Portal 2026',
  description: 'Search latest central & state government jobs, SSC, RRB, IBPS, TNPSC notifications, exam dates, admit cards, and results.',
  path: '/jobs',
});

export default async function JobsHubPage() {
  const [jobs, locations] = await Promise.all([
    getLatestJobs(20),
    getActiveLocations(),
  ]);

  const subCategories = [
    { name: 'Government Jobs', href: '/jobs/government-jobs' },
    { name: 'Private Jobs', href: '/jobs/private-jobs' },
    { name: 'Exam Dates', href: '/jobs/exam-dates' },
    { name: 'Results', href: '/jobs/results' },
    { name: 'Admit Card', href: '/jobs/admit-card' },
    { name: 'Salary', href: '/jobs/salary' },
    { name: 'Interview Questions', href: '/jobs/interview-questions' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Jobs', url: '/jobs' }]} />

      {/* Hero Banner */}
      <div className="bg-white text-stone-900 border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200/80 text-xs px-3 py-1 rounded-full font-semibold">
          <Briefcase className="w-4 h-4 text-amber-600" />
          Verified Recruitment Desk
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900">Jobs &amp; Careers Portal</h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed font-medium">
          Browse official job notifications, salary structures, selection process details, syllabus downloads, and direct application links.
        </p>

        {/* Subcategory Pills */}
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

      {/* Main Jobs Listing */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Jobs Grid (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">All Recruitment Notifications</h2>
            <span className="text-xs text-slate-500 font-medium">{jobs.length} Active Listings</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* <AdSlot slotId="jobs-listing-ad" /> */}
        </div>

        {/* Sidebar (1 col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Filter className="w-4 h-4 text-blue-600" /> Browse by Subcategory
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              {subCategories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="text-slate-700 hover:text-blue-700 flex justify-between items-center py-1 hover:underline">
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-400">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location Filter Box */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Jobs by Location
            </h3>
            <div className="space-y-2">
              {locations.slice(0, 6).map((loc) => (
                <LocationCard key={loc.id} location={loc} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
