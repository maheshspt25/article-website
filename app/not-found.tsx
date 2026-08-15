import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import { FileQuestion, Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-200">
        <FileQuestion className="w-8 h-8" />
      </div>

      <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">404 - Page Not Found</h1>
      <p className="text-sm text-zinc-600 max-w-md mx-auto mb-8">
        The requested article, tool, or guide could not be located or may have been moved.
      </p>

      <div className="mb-10">
        <SearchBox placeholder="Search for calculators, tools, technology reviews, and practical guides..." size="lg" />
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
        <Link href="/" className="inline-flex items-center gap-1.5 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm font-bold">
          <Home className="w-4 h-4" /> Go to Homepage
        </Link>
        <Link href="/tools" className="inline-flex items-center gap-1.5 bg-zinc-200 text-zinc-800 px-5 py-2.5 rounded-xl hover:bg-zinc-300 transition-colors font-bold">
          Explore Utility Tools <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
