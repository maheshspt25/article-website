import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    category: string;
  };
}

const categoryNames: Record<string, { title: string; desc: string; bg: string }> = {
  email: { title: 'Gmail & Email Guides', desc: 'Signatures, scheduling, filters, storage cleanup, and email security solutions.', bg: 'bg-red-900' },
  google: { title: 'Google Services & Account Guides', desc: 'Account recovery, Drive storage management, Sheets formulas, and Password Manager.', bg: 'bg-blue-900' },
  whatsapp: { title: 'WhatsApp Solutions & Privacy', desc: 'Backups, chat transfer, multi-device setup, privacy locks, and media management.', bg: 'bg-emerald-900' },
  iphone: { title: 'iPhone & iOS Guides', desc: 'Data transfer, battery health, AirDrop troubleshooting, document scanning, and Focus mode.', bg: 'bg-slate-900' },
  'social-media': { title: 'Social Media Guides (Instagram, Facebook, X, LinkedIn)', desc: 'Account recovery, 2FA security, privacy controls, and data downloads.', bg: 'bg-purple-900' },
  youtube: { title: 'YouTube Tutorials & Channel Management', desc: 'Channel creation, Shorts, thumbnails, subtitles, and account protection.', bg: 'bg-red-900' },
  'microsoft-office': { title: 'Microsoft Office (Word, Excel, PowerPoint)', desc: 'VLOOKUP/XLOOKUP, pivot tables, TOC creation, mail merge, and presentation tools.', bg: 'bg-blue-900' },
  browsers: { title: 'Chrome & Web Browser Fixes', desc: 'Cache clearing, bookmark backups, password management, extensions, and loading fixes.', bg: 'bg-blue-800' },
  network: { title: 'Wi-Fi & Network Troubleshooting', desc: 'Authentication errors, DNS flushing, IP renewal, packet loss, and router setup.', bg: 'bg-indigo-900' },
  'git-github': { title: 'Git & GitHub Version Control', desc: 'SSH authentication, branch merging, merge conflict resolution, and Vercel deployment.', bg: 'bg-slate-900' },
  devops: { title: 'Docker, Nginx & DevOps Deployment', desc: 'Dockerfiles, Docker Compose, Nginx reverse proxies, SSL Certbot, and server monitoring.', bg: 'bg-cyan-900' },
  ai: { title: 'AI Tools & Prompt Engineering', desc: 'ChatGPT, Claude, Gemini, AI image generation, PDF summaries, and AI coding.', bg: 'bg-violet-900' },
  'files-storage': { title: 'File & Disk Storage Management', desc: 'File recovery, disk space cleanup, batch renaming, 7-Zip encryption, and file sync.', bg: 'bg-slate-800' },
  'smart-tv': { title: 'Smart TV & Streaming Guides', desc: 'Wi-Fi connections, screen mirroring, AirPlay, HDMI troubleshooting, and audio fixes.', bg: 'bg-slate-900' },
  printer: { title: 'Printer & Scanner Solutions', desc: 'Wireless printer setup, offline errors, queue clearing, multi-page PDF scanning, and AirPrint.', bg: 'bg-teal-900' },
  'smart-home': { title: 'Smart Home & IoT Setup', desc: 'Smart bulbs, Alexa/Google Home routines, camera configuration, and IoT security.', bg: 'bg-blue-900' },
  'digital-payments': { title: 'Digital Payments & UPI Guides', desc: 'UPI setup, PIN resets, failed transaction resolution, AutoPay, and QR security.', bg: 'bg-emerald-900' },
  career: { title: 'Resume & Career Tools', desc: 'ATS resume formatting, interview prep, cover letters, and LinkedIn optimization.', bg: 'bg-blue-900' },
  documents: { title: 'Online Forms & Official Documents', desc: 'Digital signatures, photo/signature resizing, affidavit formats, and NOC templates.', bg: 'bg-amber-900' },
  security: { title: 'Online Security & Digital Privacy', desc: '2FA authentication, phishing detection, password managers, and device encryption.', bg: 'bg-rose-900' },
  windows: { title: 'Windows 11 & Windows 10 Solutions', desc: 'Registry tweaks, system repair commands, and performance optimizations.', bg: 'bg-blue-900' },
  android: { title: 'Android Guides & Troubleshooting', desc: 'Practical battery, performance, and security solutions for Android phones.', bg: 'bg-emerald-900' },
  pdf: { title: 'PDF Documents & Conversion Guides', desc: 'Easy document conversion solutions for official job applications.', bg: 'bg-red-900' },
  linux: { title: 'Linux Tutorials & Command Line Guides', desc: 'Ubuntu, Debian, and Fedora tutorials for students and developers.', bg: 'bg-slate-900' },
  internet: { title: 'Internet & Network Troubleshooting', desc: 'Solutions for Wi-Fi speed, router configuration, and browser cache errors.', bg: 'bg-slate-900' },
};

export async function generateMetadata({ params }: Props) {
  const info = categoryNames[params.category] || {
    title: `${params.category.toUpperCase()} How-To Guides`,
    desc: `Step-by-step practical solutions and guides for ${params.category}.`,
  };

  return constructMetadata({
    title: `${info.title} | InfoMitra`,
    description: info.desc,
    path: `/how-to/${params.category}`,
  });
}

export default async function DynamicHowToCategoryPage({ params }: Props) {
  const articles = await getLatestArticles('how-to', 100, params.category);
  const info = categoryNames[params.category] || {
    title: `${params.category.replaceAll('-', ' ').toUpperCase()} How-To Guides`,
    desc: `Step-by-step practical solutions and tutorials for ${params.category}.`,
    bg: 'bg-slate-900',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs
        items={[
          { name: 'How-To', url: '/how-to' },
          { name: params.category.replaceAll('-', ' '), url: `/how-to/${params.category}` },
        ]}
      />

      <div className={`${info.bg} text-white rounded-2xl p-6 sm:p-8 shadow-xl`}>
        <h1 className="text-2xl sm:text-3xl font-extrabold capitalize">{info.title}</h1>
        <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-3xl leading-relaxed">{info.desc}</p>
        <div className="mt-4 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-lg inline-block">
          {articles.length} Verified Guides Available
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-600 font-medium">No guides found in this sub-category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      )}
    </div>
  );
}
