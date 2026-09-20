import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  Percent,
  Calculator,
  Banknote,
  TrendingUp,
  Receipt,
  FileImage,
  Crop,
  FileText,
  QrCode,
  Ruler,
  FileCode,
  Code,
  Binary,
  ArrowRight,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Percent,
  Calculator,
  Banknote,
  TrendingUp,
  Receipt,
  FileImage,
  Crop,
  FileText,
  QrCode,
  Ruler,
  FileCode,
  Code,
  Binary,
};

export interface ToolCardProps {
  tool: {
    id?: string;
    name: string;
    slug: string;
    category?: string;
    description: string;
    icon?: string;
    isFeatured?: boolean;
  };
}

export default function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = (tool.icon && iconMap[tool.icon]) ? iconMap[tool.icon] : Calculator;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="bg-white rounded-lg border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors border border-blue-200/80">
            <IconComponent className="w-4 h-4" />
          </div>
          {tool.category && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/60 text-slate-600">
              {tool.category}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5 leading-snug">
          {tool.name}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3 font-normal">
          {tool.description}
        </p>
      </div>

      <div className="pt-2 flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-700">
        Open Tool <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
