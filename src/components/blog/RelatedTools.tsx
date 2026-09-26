import React from 'react';
import Link from 'next/link';
import { TOOLS_LIST } from '@/data/tools-data';
import { Sparkles, ArrowLeft } from 'lucide-react';

interface RelatedToolsProps {
  currentToolSlug?: string;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ currentToolSlug }) => {
  const related = TOOLS_LIST.filter((t) => t.slug !== currentToolSlug).slice(0, 3);

  return (
    <div className="my-10 p-6 rounded-3xl bg-gradient-to-br from-[#141D30] to-[#26395E] text-white border border-[#26395E] space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-[#B2CBF4]" />
        <h3 className="text-lg font-bold">جرب حاسبات صافي المالية المجانية</h3>
      </div>
      <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
        وفر وقتك وتجنب الأخطاء الحسابية باستخدام أدواتنا المصممة خصيصًا لتجار سلة، زد، وشوبيفاي.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.path}
            className="p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs font-bold text-white group-hover:text-[#B2CBF4] transition-colors">
                {tool.title}
              </span>
              <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">
                {tool.shortDescription}
              </p>
            </div>
            <div className="mt-2 text-[11px] font-bold text-[#B2CBF4] flex items-center gap-1">
              <span>استخدم الأداة</span>
              <ArrowLeft className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
