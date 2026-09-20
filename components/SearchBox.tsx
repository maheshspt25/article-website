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
            className={`w-full bg-white border border-stone-200/90 hover:border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-100 rounded-xl shadow-xs text-stone-900 transition-all outline-none ${
              size === 'lg' ? 'py-3.5 pl-11 pr-26 text-sm sm:text-base' : 'py-2.5 pl-10 pr-24 text-sm'
            }`}
          />
          <Search className={`absolute left-3.5 text-stone-400 group-hover:text-amber-600 transition-colors ${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
          
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-22 p-1 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className={`absolute right-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors shadow-xs flex items-center ${
              size === 'lg' ? 'px-4 py-2 text-xs sm:text-sm' : 'px-3 py-1.5 text-xs'
            }`}
          >
            Search
          </button>
        </div>
      </form>

      {size === 'lg' && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-stone-600">
          <span className="font-semibold flex items-center gap-1 text-stone-500 text-[11px]">
            <Sparkles className="w-3 h-3 text-amber-500" /> Popular Searches:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term);
                router.push(`/search?q=${encodeURIComponent(term)}`);
              }}
              className="bg-white hover:bg-stone-50 text-stone-700 hover:text-amber-900 px-2.5 py-1 rounded-md transition-colors border border-stone-200/80 font-medium text-[11px] shadow-xs"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
