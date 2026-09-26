import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-3xl border border-[#D9D9D9] shadow-soft shadow-hover overflow-hidden flex flex-col justify-between group">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-semibold text-[#4B6AD9] bg-[#FAF8FF] px-2.5 py-1 rounded-full border border-[#B2CBF4]/80">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {post.publishedAt}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg md:text-xl font-bold text-[#141D30] group-hover:text-[#4B6AD9] transition-colors leading-snug">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 py-4 bg-[#FAF8FF]/60 border-t border-[#D9D9D9]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#4B6AD9] text-white flex items-center justify-center text-[10px] font-bold">
            ص
          </div>
          <span className="text-xs font-medium text-slate-600">
            {post.author.name}
          </span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#4B6AD9] hover:text-[#26395E] group-hover:translate-x-[-3px] transition-all"
        >
          <span>اقرأ المقال</span>
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
        </Link>
      </div>
    </article>
  );
};
