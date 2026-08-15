'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBoxProps {
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
}

export default function SearchBox({
  placeholder = 'Search tools, calculators, tech reviews, and practical guides...',
  size = 'lg',
  autoFocus = false,
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const popularSearches = [
    'EMI Calculator',
    'PDF Tools',
    'GST Calculator',
    'Age Calculator',
    'Tax Regime 2026',
    'Laptop Buying Guide',
    'Ubuntu Installation'
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="relative group">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={`w-full bg-white border border-slate-300 group-hover:border-blue-500 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-xl shadow-sm text-slate-900 transition-all outline-none ${
              size === 'lg' ? 'py-4 pl-12 pr-28 text-base sm:text-lg' : 'py-2.5 pl-10 pr-24 text-sm'
            }`}
          />
          <Search className={`absolute left-4 text-slate-400 group-hover:text-blue-600 transition-colors ${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
          
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-24 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className={`absolute right-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-sm flex items-center ${
              size === 'lg' ? 'px-5 py-2.5 text-sm sm:text-base' : 'px-3 py-1.5 text-xs'
            }`}
          >
            Search
          </button>
        </div>
      </form>

      {size === 'lg' && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
          <span className="font-semibold flex items-center gap-1 text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Popular Searches:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term);
                router.push(`/search?q=${encodeURIComponent(term)}`);
              }}
              className="bg-blue-50 hover:bg-blue-100 text-blue-900 px-2.5 py-1 rounded-full transition-colors border border-blue-200/80 font-bold"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
