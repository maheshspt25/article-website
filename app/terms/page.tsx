import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Terms of Service - InfoMitra',
  description: 'Terms and conditions for using InfoMitra information portal and online calculators.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Terms of Service', url: '/terms' }]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold">Terms of Service</h1>
        <p className="text-xs text-slate-400">Effective Date: August 2026</p>
      </div>

      <div className="article-prose bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing InfoMitra, you agree to comply with these Terms of Service. If you do not agree with any part of these terms, please discontinue using the platform.
        </p>

        <h2>2. Intellectual Property</h2>
        <p>
          All original editorial articles, calculators, and software design systems on InfoMitra are protected by copyright laws. Official technical notices remain the property of their respective creators.
        </p>

        <h2>3. Limitation of Liability</h2>
        <p>
          While InfoMitra fact-checks all articles, readers should independently cross-verify details on official portal documentation.
        </p>
      </div>
    </div>
  );
}
