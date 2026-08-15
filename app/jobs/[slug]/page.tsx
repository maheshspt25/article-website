import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedContent from '@/components/RelatedContent';
import TableOfContents from '@/components/TableOfContents';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { getJobBySlug, getLatestJobs } from '@/lib/queries';
import { constructMetadata, generateJobPostingJsonLd, generateFaqJsonLd } from '@/lib/seo';
import {
  Building2,
  MapPin,
  IndianRupee,
  Calendar,
  ExternalLink,
  ShieldAlert,
  GraduationCap,
  FileCheck2,
  FileText,
  UserCheck,
  CheckCircle2,
  HelpCircle,
  Clock
} from 'lucide-react';

interface JobPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: JobPageProps) {
  const job = await getJobBySlug(params.slug);
  if (!job) return {};

  return constructMetadata({
    title: `${job.title} - Notification, Eligibility & Apply Online`,
    description: `Official details for ${job.title} by ${job.organization}. Qualification: ${job.qualification}. Salary: ${job.salaryDisplay || 'As per norms'}. Apply online before last date.`,
    path: `/jobs/${job.slug}`,
  });
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const job = await getJobBySlug(params.slug);
  if (!job) {
    notFound();
  }

  const relatedJobs = await getLatestJobs(4);
  const jobPostingJsonLd = generateJobPostingJsonLd(job);

  let importantDates = [];
  try {
    if (job.importantDatesJson) {
      importantDates = JSON.parse(job.importantDatesJson);
    }
  } catch (e) {}

  let faqs = [];
  try {
    if (job.faqJson) {
      faqs = JSON.parse(job.faqJson);
    }
  } catch (e) {}

  const faqJsonLd = generateFaqJsonLd(faqs);

  const tocItems = [
    { id: 'overview', text: 'Official Job Overview' },
    { id: 'important-dates', text: 'Important Dates & Schedule' },
    { id: 'salary-vacancies', text: 'Salary & Vacancies' },
    { id: 'eligibility', text: 'Eligibility & Qualification' },
    { id: 'selection-process', text: 'Selection Process & Exam Pattern' },
    { id: 'documents', text: 'Required Documents' },
    { id: 'official-links', text: 'Official Notification & Apply Links' },
    { id: 'faqs', text: 'Frequently Asked Questions (FAQ)' },
  ];

  return (
    <>
      <JsonLd data={jobPostingJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[
          { name: 'Jobs', url: '/jobs' },
          { name: job.title, url: `/jobs/${job.slug}` }
        ]} />

        {/* Article Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-md bg-blue-100 text-blue-800">
              <Building2 className="w-3.5 h-3.5" /> {job.organization}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Posted on {new Date(job.createdAt).toLocaleDateString('en-IN')}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {job.title}
          </h1>

          {/* Key Metric Highlights Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs">
            <div>
              <span className="text-slate-500 font-semibold block">Organization</span>
              <strong className="text-slate-900 truncate block">{job.organization}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Job Location</span>
              <strong className="text-slate-900 truncate block">{job.locationName}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Last Date</span>
              <strong className="text-red-600 block">
                {job.applicationEndDate ? new Date(job.applicationEndDate).toLocaleDateString('en-IN') : 'Check Official Link'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Total Vacancies</span>
              <strong className="text-emerald-700 block">{job.vacancyCount ? job.vacancyCount.toLocaleString('en-IN') : 'Multiple'}</strong>
            </div>
          </div>
        </div>

        {/* Editorial Notice Banner */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold block mb-0.5">Editorial Fact-Check Guarantee:</strong>
            Information on this page is summarized by our editorial team from the official recruitment advertisement. Candidates are strongly advised to verify details from official PDF links below before making fee payments.
          </div>
        </div>

        {/* Table of Contents */}
        <TableOfContents items={tocItems} />

        {/* Content Sections */}
        <article className="article-prose space-y-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          
          {/* Overview */}
          <section id="overview">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Official Job Overview
            </h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              {job.description}
            </p>
          </section>

          {/* Important Dates Table */}
          <section id="important-dates">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Important Dates & Exam Schedule
            </h2>
            {importantDates.length > 0 ? (
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 font-bold">
                      <th className="p-3 border border-slate-300">Recruitment Event</th>
                      <th className="p-3 border border-slate-300">Scheduled Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importantDates.map((item: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 border border-slate-200 font-medium">{item.event}</td>
                        <td className="p-3 border border-slate-200 font-bold text-blue-700">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-2 text-xs text-slate-600">Refer to official notification PDF for phase-wise exam timetable.</p>
            )}
          </section>

          {/* Salary & Vacancies */}
          <section id="salary-vacancies">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-emerald-600" /> Salary Structure & Vacancies
            </h2>
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 mt-3 text-xs sm:text-sm space-y-2">
              <p><strong>Monthly Salary Range:</strong> {job.salaryDisplay || 'As per 7th Pay Commission pay level norms.'}</p>
              {job.vacancyCount && <p><strong>Total Advertised Posts:</strong> {job.vacancyCount.toLocaleString('en-IN')} Vacancies.</p>}
            </div>
          </section>

          {/* Eligibility */}
          <section id="eligibility">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" /> Eligibility Criteria & Qualification
            </h2>
            <div className="space-y-3 mt-3 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Educational Qualification:</strong>
                <p className="text-slate-700">{job.qualification}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Age Limit & Relaxation:</strong>
                <p className="text-slate-700">{job.eligibility}</p>
              </div>
            </div>
          </section>

          {/* Selection Process */}
          <section id="selection-process">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" /> Selection Process & Exam Pattern
            </h2>
            <p className="mt-3 text-slate-700 leading-relaxed">
              {job.selectionProcess}
            </p>
            {job.syllabus && (
              <div className="mt-3 p-4 bg-blue-50/60 border border-blue-200 rounded-xl text-xs sm:text-sm">
                <strong className="block font-bold text-blue-950 mb-1">Syllabus Highlights:</strong>
                <p className="text-blue-900">{job.syllabus}</p>
              </div>
            )}
          </section>

          {/* Documents Required */}
          {job.documentsRequired && (
            <section id="documents">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600" /> Required Documents for Online Application
              </h2>
              <pre className="whitespace-pre-wrap text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl font-sans mt-3 border border-slate-200">
                {job.documentsRequired}
              </pre>
            </section>
          )}

          {/* Ad Slot */}
          {/* <AdSlot slotId="job-detail-inside-ad" /> */}

          {/* Official Notification & Application Links */}
          <section id="official-links" className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white border-b border-slate-800 pb-3">
              <ExternalLink className="w-5 h-5 text-amber-400" /> Official Links & Application Portals
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {job.officialNotificationUrl && (
                <a
                  href={job.officialNotificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold p-4 rounded-xl border border-slate-700 flex items-center justify-between text-xs transition-colors"
                >
                  <span>Download Official Notification (PDF)</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              )}

              {job.officialApplicationUrl && (
                <a
                  href={job.officialApplicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-xl flex items-center justify-between text-xs transition-colors shadow-sm"
                >
                  <span>Official Online Application Portal</span>
                  <ExternalLink className="w-4 h-4 text-white" />
                </a>
              )}
            </div>
          </section>

          {/* FAQs */}
          {faqs.length > 0 && (
            <section id="faqs">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" /> Frequently Asked Questions (FAQ)
              </h2>
              <div className="space-y-4 mt-4">
                {faqs.map((faq: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                      <span className="text-blue-600 font-extrabold">Q:</span> {faq.q}
                    </h3>
                    <p className="text-xs text-slate-700 mt-2 pl-5 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </article>

        {/* Related Jobs Section */}
        <RelatedContent title="Related Government Jobs" jobs={relatedJobs} />

      </div>
    </>
  );
}
