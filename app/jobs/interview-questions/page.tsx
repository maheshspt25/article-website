import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JobCard from '@/components/JobCard';
import { getLatestJobs } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Interview Questions & Preparation Guides 2026',
  description: 'Top technical, HR, and government interview preparation questions with sample answers for job seekers.',
  path: '/jobs/interview-questions',
});

export default async function InterviewQuestionsPage() {
  const jobs = await getLatestJobs(20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Jobs', url: '/jobs' },
        { name: 'Interview Questions', url: '/jobs/interview-questions' }
      ]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Interview Questions & Preparation</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Frequently asked technical, HR, and panel interview questions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
