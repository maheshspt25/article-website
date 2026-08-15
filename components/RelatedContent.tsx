import React from 'react';
import JobCard from './JobCard';
import ArticleCard from './ArticleCard';

interface RelatedContentProps {
  title?: string;
  jobs?: any[];
  articles?: any[];
}

export default function RelatedContent({
  title = 'Related Content',
  jobs = [],
  articles = [],
}: RelatedContentProps) {
  if (jobs.length === 0 && articles.length === 0) return null;

  return (
    <div className="my-10 pt-8 border-t border-slate-200">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span>
        {title}
      </h3>

      {jobs.length > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}

      {articles.length > 0 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
