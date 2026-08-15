import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import JsonLd from './JsonLd';
import { generateBreadcrumbJsonLd } from '@/lib/seo';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const fullItems = [{ name: 'Home', url: '/' }, ...items];
  const jsonLdData = generateBreadcrumbJsonLd(fullItems);

  return (
    <>
      <JsonLd data={jsonLdData} />
      <nav aria-label="Breadcrumb" className="py-2.5 px-3 bg-slate-50 rounded-lg text-sm border border-slate-200/80 mb-6 overflow-x-auto whitespace-nowrap">
        <ol className="flex items-center space-x-1.5 text-slate-600">
          {fullItems.map((item, idx) => {
            const isLast = idx === fullItems.length - 1;
            return (
              <li key={idx} className="inline-flex items-center">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-400 flex-shrink-0" />}
                {idx === 0 && <Home className="w-3.5 h-3.5 mr-1 text-slate-500 flex-shrink-0" />}
                {isLast ? (
                  <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-[350px]" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-blue-700 hover:underline transition-colors truncate max-w-[150px] sm:max-w-[200px]"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
