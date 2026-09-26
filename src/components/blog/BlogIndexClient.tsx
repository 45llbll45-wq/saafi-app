'use client';

import React, { useState, useMemo } from 'react';
import { BlogPost } from '@/lib/types';
import { BlogCard } from '@/components/blog/BlogCard';
import { Search, Sparkles, Filter, BookOpen } from 'lucide-react';

interface BlogIndexClientProps {
  posts: BlogPost[];
}

export const BlogIndexClient: React.FC<BlogIndexClientProps> = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return ['all', ...Array.from(cats)];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        selectedCategory === 'all' || post.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  const nonFeaturedPosts = useMemo(() => {
    if (selectedCategory === 'all' && searchQuery.trim() === '') {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Featured Article on Top (when no filters applied) */}
      {selectedCategory === 'all' && searchQuery.trim() === '' && featuredPost && (
        <div className="max-w-7xl mx-auto">
          <BlogCard post={featuredPost} isFeatured={true} />
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#D9D9D9] shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث في عناوين ومواضيع المقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-[#D9D9D9] text-xs sm:text-sm focus:border-[#4B6AD9] focus:outline-none focus:ring-2 focus:ring-[#4B6AD9]/20"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const label =
                cat === 'all'
                  ? 'جميع المقالات'
                  : cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#4B6AD9] text-white shadow-xs'
                      : 'bg-[#FAF8FF] text-slate-600 hover:bg-[#FAF8FF]/80 border border-[#D9D9D9]/80'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {nonFeaturedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nonFeaturedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#D9D9D9] space-y-3 p-6">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-[#141D30]">
            لم نجد مقالات تطابق بحثك
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-[#FAF8FF] border border-[#B2CBF4] text-[#4B6AD9] text-xs font-bold"
          >
            إعادة تعيين الفلتر
          </button>
        </div>
      )}
    </div>
  );
};
