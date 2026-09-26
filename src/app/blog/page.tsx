import React from 'react';
import { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blog-posts';
import { BlogIndexClient } from '@/components/blog/BlogIndexClient';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { AdSlot } from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'مدونة صافي | أدلة ونصائح مالية وحساب الأرباح للمتاجر الإلكترونية',
  description:
    'مقالات عملية وأدلة إرشادية حول حساب صافي أرباح المتجر الإلكتروني، تسعير المنتجات، نقطة التعادل، حساب تكلفة الإعلانات، وتجنب الخسائر المالية.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndexPage() {
  const breadcrumbItems = [{ name: 'المدونة', url: '/blog' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      {/* رأس المدونة */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FAF8FF] border border-[#B2CBF4] text-[#4B6AD9] text-xs font-bold shadow-xs">
          <span>أدلة ومقالات مالية عملية ومحدثة</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#141D30] tracking-tight">
          مدونة <span className="text-[#4B6AD9]">صافي</span>
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          دليلك المالي الشامل لفهم لغة الأرقام، تسعير المنتجات باحتراف، وزيادة أرباح متجرك في سلة وزد وشوبيفاي بعيدًا عن الأوهام التسويقية.
        </p>
      </div>

      {/* إعلان علوي */}
      <AdSlot position="top-banner" slotId="blog-index-top" />

      {/* قائمة المقالات التفاعلية والبحث والتصنيفات */}
      <BlogIndexClient posts={BLOG_POSTS} />

      {/* إعلان سفلي */}
      <AdSlot position="bottom-banner" slotId="blog-index-bottom" />
    </div>
  );
}
