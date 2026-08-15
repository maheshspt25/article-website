import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JobCard from '@/components/JobCard';
import { getLatestJobs } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Government Pay Matrix & Salary Breakdown 2026',
  description: 'Detailed 7th Pay Commission pay level, basic pay, DA, HRA allowances, and gross vs in-hand salary analysis.',
  path: '/jobs/salary',
});

export default async function SalaryPage() {
  const jobs = await getLatestJobs(20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Jobs', url: '/jobs' },
        { name: 'Salary Structure', url: '/jobs/salary' }
      ]} />

      <div className="bg-amber-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Government & Corporate Salary Guides</h1>
        <p className="text-xs sm:text-sm text-amber-200 mt-1">In-Hand Salary, 7th Pay Commission Pay Matrix Levels, and Allowances.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
