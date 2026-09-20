import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Building2, GraduationCap, ArrowRight, IndianRupee, Clock } from 'lucide-react';

export interface JobCardProps {
  job: {
    id: string;
    title: string;
    slug: string;
    organization: string;
    locationName: string;
    qualification: string;
    salaryDisplay?: string | null;
    applicationEndDate?: Date | string | null;
    jobType?: string;
    featured?: boolean;
    vacancyCount?: number | null;
  };
}

export default function JobCard({ job }: JobCardProps) {
  const formattedDate = job.applicationEndDate
    ? new Date(job.applicationEndDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Check Notification';

  return (
    <div className={`bg-white rounded-xl border p-5 shadow-xs hover:border-amber-300 hover:shadow-card-hover transition-all flex flex-col justify-between group ${
      job.featured ? 'border-amber-300 ring-1 ring-amber-100/60 bg-gradient-to-br from-white to-amber-50/20' : 'border-stone-200/90'
    }`}>
      <div>
        {/* Header Tags */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-50 border border-stone-200/80 text-stone-700">
            <Building2 className="w-3 h-3 text-stone-400" />
            {job.organization}
          </span>
          {job.vacancyCount && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800">
              {job.vacancyCount.toLocaleString('en-IN')} Posts
            </span>
          )}
        </div>

        {/* Job Title */}
        <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 mb-3">
          <Link href={`/jobs/${job.slug}`}>
            {job.title}
          </Link>
        </h3>

        {/* Details Grid */}
        <div className="space-y-2 text-xs text-stone-600 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
            <span className="truncate">{job.locationName}</span>
          </div>

          <div className="flex items-start gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{job.qualification}</span>
          </div>

          {job.salaryDisplay && (
            <div className="flex items-center gap-2 text-emerald-700 font-semibold">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{job.salaryDisplay}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer info & CTA */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-stone-500">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Last Date: <strong className="text-stone-800">{formattedDate}</strong></span>
        </div>

        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-amber-700 group-hover:text-amber-800 hover:underline"
        >
          View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
