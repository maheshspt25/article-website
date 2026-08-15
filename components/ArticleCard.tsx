import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

export interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    categorySection: string;
    subCategory?: string | null;
    readingTime?: string | null;
    createdAt: Date | string;
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const categoryPath = `/${article.categorySection}`;
  const articlePath = `/${article.categorySection}/${article.subCategory || 'general'}/${article.slug}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <Link
            href={categoryPath}
            className="inline-flex items-center gap-1 text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200/80 hover:bg-blue-100 transition-colors"
          >
            <Tag className="w-3 h-3 text-blue-600" />
            {article.subCategory || article.categorySection}
          </Link>
          {article.readingTime && (
            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-slate-400" /> {article.readingTime}
            </span>
          )}
        </div>

        {/* Article Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
          <Link href={articlePath}>
            {article.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed font-normal">
          {article.summary}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
        <span className="text-slate-400 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-400" /> {formattedDate}
        </span>

        <Link
          href={articlePath}
          className="inline-flex items-center gap-1 font-bold text-blue-600 group-hover:text-blue-700 hover:underline"
        >
          Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
