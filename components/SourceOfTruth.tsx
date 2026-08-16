import React from 'react';
import { ShieldCheck, ExternalLink, FileCheck, CheckCircle } from 'lucide-react';

export interface SourceItem {
  title: string;
  url: string;
  authority?: string;
}

export interface SourceOfTruthProps {
  sources?: SourceItem[];
  lastVerifiedDate?: string | Date;
  checkerName?: string;
}

export default function SourceOfTruth({
  sources = [
    { title: 'Official Government Gazette & Department Portal', url: 'https://india.gov.in', authority: 'Government of India' }
  ],
  lastVerifiedDate = new Date(),
  checkerName = 'InfoMitra Editorial Desk'
}: SourceOfTruthProps) {
  const formattedDate = new Date(lastVerifiedDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-emerald-950/5 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 my-8 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm sm:text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          Primary References & Official Documentation
        </div>
        <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Reference Citations
        </div>
      </div>

      <p className="text-xs text-zinc-700 leading-relaxed font-medium">
        InfoMitra maintains rigorous publishing standards. Statements and instructions in this guide reference official documentation and primary sources.
      </p>

      <div className="space-y-2">
        <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
          <FileCheck className="w-4 h-4 text-emerald-600" /> Primary Reference Documentation:
        </h4>
        <ul className="space-y-2 text-xs">
          {sources.map((src, idx) => (
            <li key={idx} className="bg-white border border-zinc-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 overflow-hidden">
              <div className="min-w-0 flex-1 break-words">
                <strong className="font-bold text-zinc-900 block break-words">{src.title}</strong>
                {src.authority && <span className="text-[11px] text-zinc-500 font-medium block truncate">Authority: {src.authority}</span>}
              </div>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors flex-shrink-0 text-xs self-start sm:self-auto"
              >
                Official Link <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2 text-[11px] text-zinc-500 border-t border-emerald-500/10 flex flex-wrap justify-between items-center gap-2">
        <span>Editorial Desk: <strong className="text-zinc-700">{checkerName}</strong></span>
        <span>Last Updated: <strong className="text-zinc-700">{formattedDate}</strong></span>
      </div>
    </div>
  );
}
