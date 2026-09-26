import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog-posts';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/SchemaOrg';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RelatedTools } from '@/components/blog/RelatedTools';
import { BlogContentRenderer } from '@/components/blog/BlogContentRenderer';
import { AdSlot } from '@/components/ads/AdSlot';
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  ArrowLeft,
  Share2,
  Calculator,
  Sparkles,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'المقال غير موجود',
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'المدونة', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  // مقالات مقترحة أخرى
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <ArticleSchema
        title={post.title}
        description={post.metaDescription}
        url={`https://saafi.app/blog/${post.slug}`}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        authorName={post.author.name}
        tags={post.tags}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {post.faqs && <FAQSchema faqs={post.faqs} />}

      <Breadcrumbs items={breadcrumbItems} />

      {/* رأس المقال (Hero Banner) */}
      <div className="max-w-4xl mx-auto space-y-5 text-center">
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
          <span className="font-extrabold text-[#4B6AD9] bg-[#FAF8FF] px-3.5 py-1.5 rounded-full border border-[#B2CBF4] shadow-xs">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 bg-white border border-[#D9D9D9] px-3 py-1.5 rounded-full shadow-xs">
            <Clock className="w-3.5 h-3.5 text-[#4B6AD9]" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1 text-slate-500 bg-white border border-[#D9D9D9] px-3 py-1.5 rounded-full shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-[#4B6AD9]" />
            {post.publishedAt}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#141D30] tracking-tight leading-[1.25]">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          {post.excerpt}
        </p>

        {/* معلومات الكاتب */}
        <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-600">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4B6AD9] to-[#26395E] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            ص
          </div>
          <div className="text-right">
            <div className="font-bold text-[#141D30]">{post.author.name}</div>
            <div className="text-[11px] text-slate-500">{post.author.role}</div>
          </div>
        </div>
      </div>

      {/* مساحة إعلانية أعلى المقال */}
      <AdSlot position="top-banner" slotId={`article-top-${post.id}`} />

      {/* المحتوى الرئيسي وشريط المحتويات الجانبي */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#D9D9D9] shadow-soft space-y-8">
          {/* محتويات المقال للجوال */}
          {post.tableOfContents && (
            <div className="lg:hidden">
              <TableOfContents items={post.tableOfContents} />
            </div>
          )}

          {/* محتوى المقال المنسق بالكامل */}
          <BlogContentRenderer content={post.content} />

          {/* إعلان وسط المقال */}
          <AdSlot position="in-content" slotId={`article-mid-${post.id}`} />

          {/* بانر تجربة الحاسبة المرتبطة */}
          {post.relatedToolSlug && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#141D30] to-[#26395E] text-white border border-[#26395E] space-y-4 shadow-md">
              <div className="flex items-center gap-2">
                <Calculator className="w-6 h-6 text-[#B2CBF4]" />
                <h3 className="text-lg sm:text-xl font-black">
                  وفر وقتك واحسب أرقامك مباشرة الآن!
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                لا تضيع وقتك في الحسابات اليدوية المعقدة. جرب حاسبة صافي التفاعلية مجانًا وتعرف على صافي ربحك الحقيقي بدقة تامة.
              </p>
              <div className="pt-2">
                <Link
                  href={`/${post.relatedToolSlug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4B6AD9] hover:bg-[#3B57C4] text-white font-bold text-sm shadow-md transition-all hover:scale-105"
                >
                  <span>استخدم الحاسبة الآن مجانًا</span>
                  <ArrowLeft className="w-4 h-4 rtl:rotate-0" />
                </Link>
              </div>
            </div>
          )}

          {/* الأسئلة الشائعة في نهاية المقال إن وجدت */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="pt-8 border-t border-[#D9D9D9] space-y-4">
              <h3 className="text-xl font-black text-[#141D30] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#4B6AD9]" />
                <span>الأسئلة الشائعة حول هذا الدليل</span>
              </h3>
              <div className="space-y-3">
                {post.faqs.map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#FAF8FF] border border-[#B2CBF4]/60 space-y-2"
                  >
                    <div className="font-bold text-[#141D30] text-sm md:text-base">
                      {faq.question}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* وسوم المقال */}
          <div className="pt-6 border-t border-[#D9D9D9]/60 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#4B6AD9]" /> الوسوم:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[#FAF8FF] text-slate-700 border border-[#D9D9D9] px-3 py-1 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* الشريط الجانبي الثابت (سطح المكتب) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6">
          <div className="sticky top-28 space-y-6">
            {post.tableOfContents && (
              <TableOfContents items={post.tableOfContents} />
            )}
            <RelatedTools currentToolSlug={post.relatedToolSlug} />
            <AdSlot position="sidebar" slotId={`article-sidebar-${post.id}`} />
          </div>
        </aside>
      </div>

      {/* مساحة إعلانية أسفل المقال */}
      <AdSlot position="bottom-banner" slotId={`article-bottom-${post.id}`} />

      {/* مقالات مالية مقترحة أخرى */}
      <div className="max-w-4xl mx-auto pt-8 border-t border-[#D9D9D9] space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-[#141D30]">
            مقالات مالية أخرى قد تهمك
          </h3>
          <Link
            href="/blog"
            className="text-xs sm:text-sm font-bold text-[#4B6AD9] hover:text-[#26395E] flex items-center gap-1"
          >
            <span>كل المقالات</span>
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {otherPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="p-5 rounded-2xl bg-white border border-[#D9D9D9] hover:border-[#4B6AD9] shadow-soft shadow-hover transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#4B6AD9] bg-[#FAF8FF] px-2.5 py-0.5 rounded-full border border-[#B2CBF4]/80 inline-block">
                  {p.category}
                </span>
                <h4 className="text-sm font-bold text-[#141D30] group-hover:text-[#4B6AD9] transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
              <div className="text-xs text-slate-500 mt-4 flex items-center justify-between border-t border-[#D9D9D9]/50 pt-3">
                <span>{p.readTime}</span>
                <span className="text-[#4B6AD9] font-bold flex items-center gap-1">
                  <span>اقرأ</span>
                  <ArrowLeft className="w-3 h-3 rtl:rotate-0" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
