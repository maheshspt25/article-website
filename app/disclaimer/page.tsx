import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Official Disclaimer - InfoMitra Portal',
  description: 'InfoMitra non-affiliation statement, official verification guidelines, and financial/health disclaimers.',
  path: '/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Disclaimer', url: '/disclaimer' }]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold">Official Disclaimer</h1>
        <p className="text-xs text-slate-300">Important Information Regarding Platform Content</p>
      </div>

      <div className="article-prose bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3 not-prose">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold block mb-0.5">Non-Affiliation Notice:</strong>
            InfoMitra is an independent educational news and research portal. We are NOT associated with or operated by any government ministry or public authority.
          </div>
        </div>

        <h2>1. Accuracy & Fact Verification</h2>
        <p>
          InfoMitra makes every effort to verify information published on our platform. However, official notifications may change without notice. Readers are advised to cross-check details on official portals.
        </p>

        <h2>2. Financial & Tax Disclaimers</h2>
        <p>
          Calculators, tax slab summaries, and mutual fund SIP return estimates provided on InfoMitra are for general educational awareness only and do not constitute certified tax advice.
        </p>

        <h2>3. Medical Disclaimer</h2>
        <p>
          Wellness and health guides published on InfoMitra are for general informational purposes only and are not a substitute for professional medical diagnosis.
        </p>
      </div>
    </div>
  );
}
