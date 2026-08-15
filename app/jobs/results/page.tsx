import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JobCard from '@/components/JobCard';
import { getLatestJobs } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Exam Results, Answer Keys & Merit List 2026',
  description: 'Check official written examination results, cut off marks, scorecards, and final merit lists.',
  path: '/jobs/results',
});

export default async function ResultsPage() {
  const jobs = await getLatestJobs(20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Jobs', url: '/jobs' },
        { name: 'Results', url: '/jobs/results' }
      ]} />

      <div className="bg-emerald-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Exam Results & Scorecard Updates</h1>
        <p className="text-xs sm:text-sm text-emerald-200 mt-1">Official result links, cut-off marks, and candidate merit list rankings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
