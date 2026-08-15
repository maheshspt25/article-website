import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JobCard from '@/components/JobCard';
import { getLatestJobs } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Download Hall Ticket & Admit Card 2026',
  description: 'Download official exam hall tickets, admit cards, exam venue details, and instructions.',
  path: '/jobs/admit-card',
});

export default async function AdmitCardPage() {
  const jobs = await getLatestJobs(20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Jobs', url: '/jobs' },
        { name: 'Admit Card', url: '/jobs/admit-card' }
      ]} />

      <div className="bg-purple-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Hall Ticket & Admit Card Download</h1>
        <p className="text-xs sm:text-sm text-purple-200 mt-1">Direct login portals for downloading official examination call letters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
