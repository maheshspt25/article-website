import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Privacy Policy - InfoMitra',
  description: 'Learn how InfoMitra protects user privacy, handles cookies, analytics data, and client-side calculators.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy-policy' }]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="article-prose bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2>1. Client-Side Data Privacy</h2>
        <p>
          InfoMitra is designed to be accessible without requiring user registration. We do not store personal financial data, photos, or documents processed through our client-side utility tools (such as Age Calculator, Image Compressor, or GST Calculator). All computations execute locally inside your web browser.
        </p>

        <h2>2. Cookies & Analytics</h2>
        <p>
          We use standard Google Analytics cookies to measure anonymous website traffic patterns, popular articles, and performance metrics to improve content usefulness.
        </p>

        <h2>3. Third-Party Advertising & Links</h2>
        <p>
          InfoMitra may display third-party advertisements (such as Google AdSense) or affiliate links. Clicking these external links will direct you to third-party merchant sites governed by their independent privacy terms.
        </p>

        <h2>4. Contact Information</h2>
        <p>
          For privacy concerns, reach our privacy desk at <code>privacy@infomitra.org</code>.
        </p>
      </div>
    </div>
  );
}
