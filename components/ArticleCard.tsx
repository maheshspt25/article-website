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
    <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs hover:border-amber-300 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Category Badge & Reading Time */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Link
            href={categoryPath}
            className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/70 hover:bg-amber-100 hover:text-amber-900 transition-colors"
          >
            <Tag className="w-3 h-3 text-amber-600" />
            {article.subCategory || article.categorySection}
          </Link>
          {article.readingTime && (
            <span className="text-[11px] text-stone-400 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-stone-400" /> {article.readingTime}
            </span>
          )}
        </div>

        {/* Article Title */}
        <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 mb-2 leading-snug">
          <Link href={articlePath}>
            {article.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-xs text-stone-600 line-clamp-3 mb-4 leading-relaxed font-normal">
          {article.summary}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium">
        <span className="text-stone-400 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-stone-400" /> {formattedDate}
        </span>

        <Link
          href={articlePath}
          className="inline-flex items-center gap-1 font-bold text-amber-700 group-hover:text-amber-800 hover:underline"
        >
          Read Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
