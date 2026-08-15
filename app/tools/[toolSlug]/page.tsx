import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import AgeCalculator from '@/components/tools/AgeCalculator';
import EmiCalculator from '@/components/tools/EmiCalculator';
import PercentageCalculator from '@/components/tools/PercentageCalculator';
import SipCalculator from '@/components/tools/SipCalculator';
import GstCalculator from '@/components/tools/GstCalculator';
import ImageCompressor from '@/components/tools/ImageCompressor';
import ImageResizer from '@/components/tools/ImageResizer';
import QrGenerator from '@/components/tools/QrGenerator';
import UnitConverter from '@/components/tools/UnitConverter';
import WordCounter from '@/components/tools/WordCounter';
import JsonFormatter from '@/components/tools/JsonFormatter';
import Base64Tool from '@/components/tools/Base64Tool';
import PdfTools from '@/components/tools/PdfTools';
import GpaCalculator from '@/components/tools/GpaCalculator';
import PomodoroTimer from '@/components/tools/PomodoroTimer';
import ResumeKeywordAnalyzer from '@/components/tools/ResumeKeywordAnalyzer';
import SalaryCalculator from '@/components/tools/SalaryCalculator';
import PasswordGenerator from '@/components/tools/PasswordGenerator';
import TextDiffTool from '@/components/tools/TextDiffTool';
import MarkdownEditor from '@/components/tools/MarkdownEditor';
import PassportPhotoMaker from '@/components/tools/PassportPhotoMaker';
import TextCaseConverter from '@/components/tools/TextCaseConverter';
import AttendanceCalculator from '@/components/tools/AttendanceCalculator';
import FdPpfCalculator from '@/components/tools/FdPpfCalculator';
import JsonCsvConverter from '@/components/tools/JsonCsvConverter';
import SeoMetaGenerator from '@/components/tools/SeoMetaGenerator';
import RegexTester from '@/components/tools/RegexTester';
import UnixTimestampConverter from '@/components/tools/UnixTimestampConverter';
import SplitBillCalculator from '@/components/tools/SplitBillCalculator';
import FuelCostCalculator from '@/components/tools/FuelCostCalculator';
import TimezoneConverter from '@/components/tools/TimezoneConverter';
import ImageMetadataRemover from '@/components/tools/ImageMetadataRemover';
import { getTools } from '@/lib/queries';
import { constructMetadata, generateWebApplicationJsonLd } from '@/lib/seo';

interface ToolPageProps {
  params: { toolSlug: string };
}

export async function generateMetadata({ params }: ToolPageProps) {
  const tools = await getTools();
  const tool = tools.find((t) => t.slug === params.toolSlug);
  if (!tool) return {};

  return constructMetadata({
    title: `${tool.name} - Free Online Tool`,
    description: tool.description,
    path: `/tools/${tool.slug}`,
  });
}

export default async function DynamicToolPage({ params }: ToolPageProps) {
  const tools = await getTools();
  const tool = tools.find((t) => t.slug === params.toolSlug);

  // Map slug to tool component
  const toolComponents: Record<string, React.ReactNode> = {
    'age-calculator': <AgeCalculator />,
    'emi-calculator': <EmiCalculator />,
    'loan-calculator': <EmiCalculator />,
    'percentage-calculator': <PercentageCalculator />,
    'sip-calculator': <SipCalculator />,
    'gst-calculator': <GstCalculator />,
    'image-compressor': <ImageCompressor />,
    'image-resizer': <ImageResizer />,
    'qr-generator': <QrGenerator />,
    'unit-converter': <UnitConverter />,
    'word-counter': <WordCounter />,
    'json-formatter': <JsonFormatter />,
    'base64-encoder-decoder': <Base64Tool />,
    'pdf-tools': <PdfTools />,
    'gpa-calculator': <GpaCalculator />,
    'cgpa-calculator': <GpaCalculator />,
    'pomodoro-timer': <PomodoroTimer />,
    'resume-keyword-analyzer': <ResumeKeywordAnalyzer />,
    'salary-calculator': <SalaryCalculator />,
    'take-home-salary-calculator': <SalaryCalculator />,
    'password-generator': <PasswordGenerator />,
    'text-diff-tool': <TextDiffTool />,
    'markdown-editor': <MarkdownEditor />,
    'passport-photo-maker': <PassportPhotoMaker />,
    'text-case-converter': <TextCaseConverter />,
    'attendance-calculator': <AttendanceCalculator />,
    'fd-ppf-calculator': <FdPpfCalculator />,
    'json-csv-converter': <JsonCsvConverter />,
    'seo-meta-generator': <SeoMetaGenerator />,
    'regex-tester': <RegexTester />,
    'unix-timestamp-converter': <UnixTimestampConverter />,
    'split-bill-calculator': <SplitBillCalculator />,
    'fuel-cost-calculator': <FuelCostCalculator />,
    'timezone-converter': <TimezoneConverter />,
    'world-clock': <TimezoneConverter />,
    'image-metadata-remover': <ImageMetadataRemover />,
    'exif-remover': <ImageMetadataRemover />,
  };

  const ComponentToRender = toolComponents[params.toolSlug];

  if (!ComponentToRender && !tool) {
    notFound();
  }

  const toolSchema = tool ? generateWebApplicationJsonLd(tool) : null;

  return (
    <>
      {toolSchema && <JsonLd data={toolSchema} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[
          { name: 'Tools', url: '/tools' },
          { name: tool ? tool.name : params.toolSlug, url: `/tools/${params.toolSlug}` }
        ]} />

        <div>
          {ComponentToRender || (
            <div className="bg-white rounded-2xl border border-zinc-200 p-8 text-center text-zinc-600 font-medium">
              Tool under active maintenance. Select from our popular calculators above.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
