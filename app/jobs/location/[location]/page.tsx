import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import JobCard from '@/components/JobCard';
import ArticleCard from '@/components/ArticleCard';
import { getLocationBySlug } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { MapPin, Briefcase } from 'lucide-react';

interface LocationPageProps {
  params: { location: string };
}

export async function generateMetadata({ params }: LocationPageProps) {
  const loc = await getLocationBySlug(params.location);
  if (!loc) return {};

  return constructMetadata({
    title: `Government & Private Jobs in ${loc.name}, ${loc.state}`,
    description: `Browse latest recruitment notifications, private job vacancies, and educational updates in ${loc.name}, ${loc.state}.`,
    path: `/jobs/location/${loc.slug}`,
  });
}

export default async function LocationJobsPage({ params }: LocationPageProps) {
  const loc = await getLocationBySlug(params.location);
  if (!loc) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[
        { name: 'Jobs', url: '/jobs' },
        { name: `Jobs in ${loc.name}`, url: `/jobs/location/${loc.slug}` }
      ]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs px-3 py-1 rounded-full font-semibold">
          <MapPin className="w-4 h-4 text-blue-400" />
          Location Employment Hub
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">
          Latest Jobs in {loc.name}, {loc.state}
        </h1>
        {loc.description && (
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {loc.description}
          </p>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" /> Active Openings in {loc.name}
          </h2>
          <span className="text-xs text-slate-500">{loc.jobs.length} Active Listings</span>
        </div>

        {loc.jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loc.jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-sm">
            No specific local listings published for {loc.name} today. Check all pan-India jobs above.
          </div>
        )}
      </div>
    </div>
  );
}
