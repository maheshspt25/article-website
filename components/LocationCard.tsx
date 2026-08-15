import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export interface LocationCardProps {
  location: {
    id: string;
    name: string;
    slug: string;
    state: string;
    description?: string | null;
  };
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <Link
      href={`/jobs/location/${location.slug}`}
      className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex items-center justify-between group"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <MapPin className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {location.name}
          </h4>
          <p className="text-xs text-slate-500">{location.state}</p>
        </div>
      </div>

      <span className="text-xs font-medium text-slate-400 group-hover:text-blue-600 flex items-center gap-0.5">
        Jobs <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}
