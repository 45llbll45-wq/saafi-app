import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="مسار التنقل" className="py-3 text-xs md:text-sm text-slate-500">
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#4B6AD9] transition-colors text-slate-600"
          >
            <Home className="w-3.5 h-3.5" />
            <span>الرئيسية</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-1.5">
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400 rtl:rotate-0" />
              {isLast ? (
                <span className="font-semibold text-[#141D30]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-[#4B6AD9] transition-colors text-slate-600"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
