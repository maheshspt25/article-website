'use client';

import React, { useEffect, useState } from 'react';
import { ListTree, ChevronRight } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items?: { id: string; text: string; level?: number }[];
  tocJson?: string | null;
  contentHtml?: string;
}

export default function TableOfContents({ items: initialItems, tocJson, contentHtml }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 1. If explicit items passed
    if (initialItems && initialItems.length > 0) {
      setItems(initialItems.map((it) => ({ id: it.id, text: it.text, level: it.level || 2 })));
      return;
    }

    // 2. Try to parse from tocJson
    if (tocJson) {
      try {
        const parsed = JSON.parse(tocJson);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted: TocItem[] = parsed.map((item: any, idx: number) => ({
            id: item.id || `heading-${idx}`,
            text: typeof item === 'string' ? item : item.title || item.text,
            level: item.level || 2,
          }));
          setItems(formatted);
          return;
        }
      } catch (e) {}
    }

    // 2. Fallback: Parse headings from DOM
    const article = document.querySelector('article');
    if (article) {
      const headings = Array.from(article.querySelectorAll('h2, h3'));
      const parsedItems: TocItem[] = headings.map((heading, idx) => {
        let id = heading.id;
        if (!id) {
          id = `section-${idx}-${heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`;
          heading.id = id;
        }
        return {
          id,
          text: heading.textContent || `Section ${idx + 1}`,
          level: heading.tagName.toLowerCase() === 'h3' ? 3 : 2,
        };
      });
      setItems(parsedItems);
    }
  }, [initialItems, tocJson, contentHtml]);

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      let currentActive = items[0]?.id || '';

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY - 120;
          if (scrollY >= top) {
            currentActive = item.id;
          }
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-stone-200/90 p-5 shadow-xs">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-stone-100">
        <ListTree className="w-4 h-4 text-amber-600" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
          Table of Contents
        </h3>
      </div>

      <nav className="space-y-1 text-xs max-h-[60vh] overflow-y-auto pr-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`group flex items-start gap-1.5 py-1.5 px-2 rounded-md transition-all ${
                item.level === 3 ? 'ml-3 text-[11px]' : 'font-medium'
              } ${
                isActive
                  ? 'bg-amber-50 text-amber-900 font-bold border-l-2 border-amber-600 pl-2'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <ChevronRight className={`w-3 h-3 mt-0.5 shrink-0 transition-transform ${
                isActive ? 'text-amber-600 translate-x-0.5' : 'text-stone-300 group-hover:text-stone-500'
              }`} />
              <span className="line-clamp-2">{item.text}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
