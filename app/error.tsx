'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-2">Something Went Wrong</h1>
      <p className="text-xs text-slate-600 mb-4">
        We encountered a temporary processing error while loading this page. Please try refreshing or returning to the home page.
      </p>

      {error?.message && (
        <div className="bg-red-50 border border-red-200 text-red-800 text-xs font-mono p-3 rounded-xl mb-6 max-w-lg mx-auto text-left overflow-x-auto break-all">
          <strong className="block mb-1 text-red-900 font-bold">Error Message:</strong>
          {error.message}
        </div>
      )}

      <div className="flex justify-center gap-3 text-xs font-semibold">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 bg-slate-200 text-slate-800 px-4 py-2.5 rounded-lg hover:bg-slate-300 transition-colors"
        >
          <Home className="w-4 h-4" /> Return Home
        </Link>
      </div>
    </div>
  );
}
