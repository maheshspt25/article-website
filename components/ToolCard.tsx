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
      className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors border border-blue-200/80">
            <IconComponent className="w-5 h-5" />
          </div>
          {tool.category && (
            <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded bg-slate-100 text-slate-600">
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
