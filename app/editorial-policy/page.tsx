import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import { CheckCircle, AlertTriangle, RefreshCw, FileCheck } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Editorial Policy & Fact-Checking Standards - InfoMitra',
  description: 'Learn how InfoMitra researches, verifies, updates, and fact-checks information.',
  path: '/editorial-policy',
});

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Editorial Policy', url: '/editorial-policy' }]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold">Editorial & Fact-Checking Policy</h1>
        <p className="text-xs text-slate-300">Our Commitment to Accuracy and Integrity</p>
      </div>

      <div className="article-prose bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2>1. Primary Source Verification</h2>
        <p>
          Every article published on InfoMitra must cite authoritative primary sources. For technical and financial guides, our researchers inspect official documentation released by primary entities.
        </p>

        <h2>2. Corrections & Updates</h2>
        <p>
          When an official release or rule is modified, our editorial team updates the corresponding article and updates the &quot;Last Updated&quot; timestamp at the top of the page.
        </p>
      </div>
    </div>
  );
}
