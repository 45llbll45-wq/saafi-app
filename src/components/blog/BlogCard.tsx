'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { Calendar, Clock, ArrowLeft, Tag, BookOpen } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  isFeatured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, isFeatured = false }) => {
  if (isFeatured) {
    return (
      <article className="bg-gradient-to-br from-[#141D30] to-[#26395E] rounded-3xl p-6 sm:p-10 text-white border border-[#26395E] shadow-lg flex flex-col justify-between group">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
            <span className="inline-flex items-center gap-1 font-bold text-[#4B6AD9] bg-white px-3 py-1 rounded-full shadow-xs">
              <BookOpen className="w-3.5 h-3.5" />
              مقال مميز • {post.category}
            </span>
            <div className="flex items-center gap-3 text-slate-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B2CBF4]" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#B2CBF4]" />
                {post.publishedAt}
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white group-hover:text-[#B2CBF4] transition-colors leading-tight">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#4B6AD9] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              ص
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                {post.author.name}
              </span>
              <span className="text-[11px] text-slate-300 block">
                {post.author.role}
              </span>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4B6AD9] hover:bg-[#3B57C4] text-white text-xs sm:text-sm font-bold shadow-md group-hover:scale-105 transition-all"
          >
            <span>قراءة الدليل بالكامل</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-0" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-3xl border border-[#D9D9D9] shadow-soft shadow-hover overflow-hidden flex flex-col justify-between group transition-all">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-bold text-[#4B6AD9] bg-[#FAF8FF] px-2.5 py-1 rounded-full border border-[#B2CBF4]/80">
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
          <h3 className="text-base sm:text-lg font-bold text-[#141D30] group-hover:text-[#4B6AD9] transition-colors leading-snug">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
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
