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
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs px-3 py-1 rounded-full font-semibold">
          <Briefcase className="w-4 h-4 text-blue-400" />
          Verified Recruitment Desk
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">Jobs & Careers Portal</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Browse official job notifications, salary structures, selection process details, syllabus downloads, and direct application links.
        </p>

        {/* Subcategory Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {subCategories.map((sub) => (
            <Link
              key={sub.name}
              href={sub.href}
              className="bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-slate-700"
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
