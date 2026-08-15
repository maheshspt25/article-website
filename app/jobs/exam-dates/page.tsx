import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import JobCard from '@/components/JobCard';
import { getLatestJobs } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Competitive Exam Dates & Calendar 2026',
  description: 'Track upcoming exam schedules for SSC CGL, RRB NTPC, IBPS PO, UPSC IAS, JEE Main, and GATE examinations.',
  path: '/jobs/exam-dates',
});

export default async function ExamDatesPage() {
  const jobs = await getLatestJobs(20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Jobs', url: '/jobs' },
        { name: 'Exam Dates', url: '/jobs/exam-dates' }
      ]} />

      <div className="bg-indigo-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Upcoming Exam Dates & Timetable 2026</h1>
        <p className="text-xs sm:text-sm text-indigo-200 mt-1">Computer Based Test (CBT) schedules, Prelims & Mains exam calendars.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
