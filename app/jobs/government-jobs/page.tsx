import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JobCard from '@/components/JobCard';
import { getLatestJobs } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Latest Government Jobs 2026 (Sarkari Naukri Notification)',
  description: 'Apply online for central government, state public service commission, railway, banking, and defense recruitment 2026.',
  path: '/jobs/government-jobs',
});

export default async function GovernmentJobsPage() {
  const jobs = await getLatestJobs(20, 'government-jobs');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Jobs', url: '/jobs' },
        { name: 'Government Jobs', url: '/jobs/government-jobs' }
      ]} />

      <div className="bg-blue-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Government Jobs (Sarkari Naukri)</h1>
        <p className="text-xs sm:text-sm text-blue-200 mt-1">Official Central & State Government Recruitment Notifications, Eligibility & Exam Schedules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
