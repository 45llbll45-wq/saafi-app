import React from 'react';
import { ListOrdered } from 'lucide-react';

interface TableOfContentsProps {
  items: { id: string; title: string; level: number }[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="p-5 rounded-2xl bg-[#FAF8FF] border border-[#D9D9D9] space-y-3" aria-label="جدول محتويات المقال">
      <div className="flex items-center gap-2 text-[#141D30] font-bold text-sm border-b border-[#D9D9D9] pb-2">
        <ListOrdered className="w-4 h-4 text-[#4B6AD9]" />
        <span>محتويات المقال</span>
      </div>
      <ul className="space-y-2 text-xs md:text-sm list-none p-0 m-0">
        {items.map((item, index) => (
          <li key={item.id} className={item.level === 3 ? 'ps-4' : ''}>
            <a
              href={`#${item.id}`}
              className="text-slate-600 hover:text-[#4B6AD9] transition-colors flex items-start gap-1.5"
            >
              <span className="text-[#4B6AD9] font-semibold">{index + 1}.</span>
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
