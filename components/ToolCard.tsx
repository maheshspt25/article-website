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
      className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs hover:border-amber-300 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-200 border border-amber-200/80">
            <IconComponent className="w-4 h-4" />
          </div>
          {tool.category && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-50 border border-stone-200/70 text-stone-600">
              {tool.category}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-700 transition-colors mb-1.5 leading-snug">
          {tool.name}
        </h3>

        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3 font-normal">
          {tool.description}
        </p>
      </div>

      <div className="pt-2 flex items-center text-xs font-bold text-amber-700 group-hover:text-amber-800">
        Launch Tool <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
