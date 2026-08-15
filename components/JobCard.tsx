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
    <div className={`bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group ${
      job.featured ? 'border-blue-300 ring-1 ring-blue-100 bg-gradient-to-br from-white to-blue-50/20' : 'border-slate-200'
    }`}>
      <div>
        {/* Header Tags */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
            <Building2 className="w-3 h-3" />
            {job.organization}
          </span>
          {job.vacancyCount && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {job.vacancyCount.toLocaleString('en-IN')} Posts
            </span>
          )}
        </div>

        {/* Job Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
          <Link href={`/jobs/${job.slug}`}>
            {job.title}
          </Link>
        </h3>

        {/* Details Grid */}
        <div className="space-y-2 text-xs text-slate-600 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
            <span className="truncate">{job.locationName}</span>
          </div>

          <div className="flex items-start gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
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
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-500">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Last Date: <strong className="text-slate-800">{formattedDate}</strong></span>
        </div>

        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:text-blue-700 hover:underline"
        >
          View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
