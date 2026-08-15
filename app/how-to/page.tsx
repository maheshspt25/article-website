import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import AdSlot from '@/components/AdSlot';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { HelpCircle, Smartphone, Monitor, Terminal, FileText, Wifi, Laptop, Sliders } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'How-To Guides, Practical Solutions & Tech Troubleshooting',
  description: 'How to convert PDF to Word, fix Android battery drain, dual-boot Ubuntu alongside Windows 11, configure Cloudflare DNS, and transfer WhatsApp chats.',
  path: '/how-to',
});

export default async function HowToHubPage() {
  const articles = await getLatestArticles('how-to', 1000);

  const subCategories = [
    { name: 'Gmail & Email', href: '/how-to/email', icon: Sliders },
    { name: 'Google Services', href: '/how-to/google', icon: Sliders },
    { name: 'WhatsApp', href: '/how-to/whatsapp', icon: Smartphone },
    { name: 'iPhone & iOS', href: '/how-to/iphone', icon: Laptop },
    { name: 'Social Media', href: '/how-to/social-media', icon: Sliders },
    { name: 'YouTube', href: '/how-to/youtube', icon: Sliders },
    { name: 'Microsoft Office', href: '/how-to/microsoft-office', icon: FileText },
    { name: 'Browsers', href: '/how-to/browsers', icon: Wifi },
    { name: 'Network & Wi-Fi', href: '/how-to/network', icon: Wifi },
    { name: 'Git & GitHub', href: '/how-to/git-github', icon: Terminal },
    { name: 'DevOps & Docker', href: '/how-to/devops', icon: Terminal },
    { name: 'AI Tools', href: '/how-to/ai', icon: Sliders },
    { name: 'Files & Storage', href: '/how-to/files-storage', icon: FileText },
    { name: 'Smart TV', href: '/how-to/smart-tv', icon: Monitor },
    { name: 'Printer & Scanner', href: '/how-to/printer', icon: FileText },
    { name: 'Smart Home', href: '/how-to/smart-home', icon: Wifi },
    { name: 'Digital Payments', href: '/how-to/digital-payments', icon: Sliders },
    { name: 'Career & Resume', href: '/how-to/career', icon: FileText },
    { name: 'Forms & Docs', href: '/how-to/documents', icon: FileText },
    { name: 'Security & Privacy', href: '/how-to/security', icon: Sliders },
    { name: 'Windows 11', href: '/how-to/windows', icon: Monitor },
    { name: 'Android', href: '/how-to/android', icon: Smartphone },
    { name: 'PDF Tools', href: '/how-to/pdf', icon: FileText },
    { name: 'Linux', href: '/how-to/linux', icon: Terminal },
    { name: 'Internet', href: '/how-to/internet', icon: Wifi },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'How-To', url: '/how-to' }]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl border border-slate-800">
        <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs px-3 py-1 rounded-full font-semibold">
          <HelpCircle className="w-4 h-4 text-blue-400" />
          Practical Solutions & Verified Tutorials
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">How-To & Practical Step-by-Step Guides</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Tested step-by-step tutorials to solve software glitches, document conversion challenges, operating system tweaks, and network setups.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {subCategories.map((sub) => {
            const Icon = sub.icon;
            return (
              <Link
                key={sub.name}
                href={sub.href}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border border-slate-700/80"
              >
                <Icon className="w-3.5 h-3.5 text-blue-400" />
                {sub.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Step-by-Step Tutorials</h2>
          <span className="text-xs text-slate-500 font-medium">{articles.length} Guides Available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>

        {/* <AdSlot slotId="howto-listing-ad" /> */}
      </div>
    </div>
  );
}
