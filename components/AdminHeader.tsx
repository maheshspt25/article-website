import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileText, PlusCircle, ExternalLink, BookOpen } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="bg-white text-slate-900 border-b border-slate-200/90 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-extrabold text-white text-lg shadow-md shadow-blue-500/20">
              IM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">InfoMitra Admin</span>
                <span className="bg-blue-50 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-blue-200 uppercase">
                  CMS v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold hidden sm:block">Editorial Desk & Content Manager</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">Overview</span>
            </Link>

            <Link
              href="/admin/articles"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Articles (563+)</span>
            </Link>

            <Link
              href="/admin/guide"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>CMS Tutorial</span>
            </Link>

            <Link
              href="/admin/articles/new"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all border border-blue-500/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">New Article</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors ml-2 border border-slate-200"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Site</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
