import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchBox from '@/components/SearchBox';
import JobCard from '@/components/JobCard';
import ArticleCard from '@/components/ArticleCard';
import ToolCard from '@/components/ToolCard';
import LocationCard from '@/components/LocationCard';
import { globalSearch } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { Search, Briefcase, FileText, Wrench, MapPin } from 'lucide-react';

interface SearchPageProps {
  searchParams: { q?: string };
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const q = searchParams.q || '';
  return constructMetadata({
    title: q ? `Search Results for "${q}"` : 'Global Search Portal',
    description: `Search results for ${q} across government jobs, exams, technology guides, and calculators.`,
    path: `/search${q ? `?q=${encodeURIComponent(q)}` : ''}`,
    noIndex: true, // Search result pages should be noindex as per SEO best practices (Requirement #12)
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const { jobs, articles, tools, locations } = await globalSearch(query);

  const totalResults = jobs.length + articles.length + tools.length + locations.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Search', url: '/search' }]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center">Search Information Portal</h1>
        <SearchBox placeholder="Search jobs, exams, technology, finance, guides..." autoFocus size="lg" />
      </div>

      {query ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Results for &quot;<span className="text-blue-600">{query}</span>&quot;
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {totalResults} Match{totalResults === 1 ? '' : 'es'} Found
            </span>
          </div>

          {totalResults === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-600 space-y-3">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No direct results found for &quot;{query}&quot;</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try searching with alternate terms like &quot;SSC&quot;, &quot;PDF&quot;, &quot;EMI&quot;, &quot;Tax&quot;, or &quot;Chennai&quot;.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              
              {/* Jobs Results */}
              {jobs.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Briefcase className="w-5 h-5 text-blue-600" /> Job Recruitment Listings ({jobs.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </section>
              )}

              {/* Articles Results */}
              {articles.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <FileText className="w-5 h-5 text-blue-600" /> Knowledge & Guide Articles ({articles.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((art) => (
                      <ArticleCard key={art.id} article={art} />
                    ))}
                  </div>
                </section>
              )}

              {/* Tools Results */}
              {tools.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Wrench className="w-5 h-5 text-amber-500" /> Utility Tools & Calculators ({tools.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tools.map((tool) => (
                      <ToolCard key={tool.id || tool.slug} tool={tool} />
                    ))}
                  </div>
                </section>
              )}

              {/* Locations Results */}
              {locations.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <MapPin className="w-5 h-5 text-blue-600" /> Location Hubs ({locations.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {locations.map((loc) => (
                      <LocationCard key={loc.id} location={loc} />
                    ))}
                  </div>
                </section>
              )}

            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-xs text-slate-500 py-10">
          Enter keywords in the search bar above to query our indexed databases.
        </div>
      )}
    </div>
  );
}
