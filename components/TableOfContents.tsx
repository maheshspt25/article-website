'use client';

import React, { useState } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';

export interface TocItem {
  id: string;
  text: string;
  level?: number;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <List className="w-4 h-4 text-blue-600" />
          Table of Contents
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-medium"
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <ul className="mt-3 space-y-1.5 text-xs border-t border-slate-200/80 pt-3">
          {items.map((item, idx) => (
            <li key={idx} className={item.level === 3 ? 'pl-4' : 'pl-0'}>
              <a
                href={`#${item.id}`}
                className="text-slate-700 hover:text-blue-700 hover:underline transition-colors block py-0.5"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
