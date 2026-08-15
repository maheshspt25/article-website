import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ToolCard from '@/components/ToolCard';
import AdSlot from '@/components/AdSlot';
import { getTools } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { Wrench } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Free Online Utility Tools, Calculators & Converters 2026',
  description: 'Age Calculator, EMI Calculator, Percentage Calculator, SIP Calculator, GST Calculator, Image Compressor, Image Resizer, QR Generator, Unit Converter, JSON Formatter, Word Counter, Base64 Encoder.',
  path: '/tools',
});

export default async function ToolsHubPage() {
  const tools = await getTools();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Tools', url: '/tools' }]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs px-3 py-1 rounded-full font-semibold">
          <Wrench className="w-4 h-4 text-amber-400" />
          Client-Side Web Tools Desk
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold">100% Free Utility Tools & Calculators</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Fast, private, client-side tools with zero data uploaded to external servers. No login required.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">All Available Tools</h2>
          <span className="text-xs text-slate-500 font-medium">{tools.length} Tools Ready</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id || tool.slug} tool={tool} />
          ))}
        </div>

        {/* <AdSlot slotId="tools-hub-ad" /> */}
      </div>
    </div>
  );
}
