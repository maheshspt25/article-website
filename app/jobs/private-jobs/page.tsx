import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JobCard from '@/components/JobCard';
import { getLatestJobs } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Private IT & Corporate Jobs 2026 for Freshers & Professionals',
  description: 'Explore off-campus hiring drives, software engineering roles, MNC campus recruitment at TCS, Tech Mahindra, Infosys, and startups.',
  path: '/jobs/private-jobs',
});

export default async function PrivateJobsPage() {
  const jobs = await getLatestJobs(20, 'private-jobs');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Jobs', url: '/jobs' },
        { name: 'Private Jobs', url: '/jobs/private-jobs' }
      ]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Private IT & Corporate Jobs</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Off-Campus Hiring Drives, Software Development Openings, and Tech Profiles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
