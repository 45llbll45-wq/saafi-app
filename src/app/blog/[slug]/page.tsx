import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog-posts';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/SchemaOrg';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RelatedTools } from '@/components/blog/RelatedTools';
import { AdSlot } from '@/components/ads/AdSlot';
import { Calendar, Clock, User, Tag, ArrowRight, ArrowLeft, Share2 } from 'lucide-react';

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
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  // دالة تحويل مبسطة لنصوص المقال مع الحفاظ على الأمان
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // الجداول
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        inTable = true;
        const cells = trimmed
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        // تجاهل صف الفاصل |---|---|
        if (!cells.every((c) => /^:?-+:?$/.test(c))) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        // إنهاء الجدول ورسمه
        const currentTable = [...tableRows];
        tableRows = [];
        inTable = false;
        elements.push(
          <div key={`table-${idx}`} className="my-6 overflow-x-auto">
            <table className="w-full text-right text-xs md:text-sm border-collapse bg-white rounded-xl shadow-xs overflow-hidden border border-[#D9D9D9]">
              {currentTable.length > 0 && (
                <thead>
                  <tr className="bg-[#FAF8FF] border-b border-[#D9D9D9] text-[#141D30] font-bold">
                    {currentTable[0].map((th, hIdx) => (
                      <th key={hIdx} className="p-3">
                        {th.replace(/\*\*/g, '')}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-[#D9D9D9]/40">
                {currentTable.slice(1).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#FAF8FF]/60">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-slate-700">
                        {cell.replace(/\*\*/g, '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      if (!trimmed) return;

      // العناوين H2
      if (trimmed.startsWith('## ')) {
        const titleText = trimmed.replace('## ', '');
        const id = titleText.toLowerCase().replace(/[^\w\u0600-\u06FF]+/g, '-');
        elements.push(
          <h2
            key={idx}
            id={id}
            className="text-xl md:text-2xl font-black text-[#141D30] mt-10 mb-4 scroll-mt-24 flex items-center gap-2 border-b border-[#D9D9D9]/40 pb-2"
          >
            <span className="w-2 h-6 rounded-full bg-[#4B6AD9] inline-block"></span>
            <span>{titleText}</span>
          </h2>
        );
        return;
      }

      // العناوين H3
      if (trimmed.startsWith('### ')) {
        const titleText = trimmed.replace('### ', '');
        elements.push(
          <h3
            key={idx}
            className="text-lg md:text-xl font-bold text-[#141D30] mt-6 mb-3"
          >
            {titleText}
          </h3>
        );
        return;
      }

      // التنبيهات والاقتباسات
      if (trimmed.startsWith('> ')) {
        elements.push(
          <div
            key={idx}
            className="my-4 p-4 rounded-2xl bg-[#FAF8FF] border-s-4 border-[#4B6AD9] text-[#141D30] text-sm leading-relaxed"
          >
            {trimmed.replace('> ', '').replace(/\*\*/g, '')}
          </div>
        );
        return;
      }

      // القوائم المنقطة
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        elements.push(
          <li key={idx} className="ms-4 text-slate-700 text-sm md:text-base leading-relaxed my-1 list-disc">
            {trimmed.replace(/^[-*]\s+/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
          </li>
        );
        return;
      }

      // القوائم المرقمة
      if (/^\d+\.\s/.test(trimmed)) {
        elements.push(
          <li key={idx} className="ms-4 text-slate-700 text-sm md:text-base leading-relaxed my-1.5 list-decimal font-medium">
            {trimmed.replace(/^\d+\.\s+/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
          </li>
        );
        return;
      }

      // الفواصل الأفقية
      if (trimmed === '---') {
        elements.push(<hr key={idx} className="my-8 border-[#D9D9D9]" />);
        return;
      }

      // المعادلات والصناديق التوضيحية
      if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
        elements.push(
          <div
            key={idx}
            className="my-4 p-4 rounded-2xl bg-[#141D30] text-[#B2CBF4] font-mono text-sm md:text-base text-center dir-ltr overflow-x-auto shadow-inner border border-[#26395E]"
          >
            {trimmed.replace(/\$\$/g, '')}
          </div>
        );
        return;
      }

      // الفقرات النصية العادية
      elements.push(
        <p key={idx} className="text-slate-700 text-sm md:text-base leading-relaxed my-3">
          {trimmed.replace(/\*\*(.*?)\*\*/g, '$1')}
        </p>
      );
    });

    return elements;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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

      {/* رأس المقال */}
      <div className="max-w-4xl mx-auto space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
          <span className="font-bold text-[#4B6AD9] bg-[#FAF8FF] px-3 py-1 rounded-full border border-[#B2CBF4]">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500 bg-[#FAF8FF] border border-[#D9D9D9]/70 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1 text-slate-500 bg-[#FAF8FF] border border-[#D9D9D9]/70 px-3 py-1 rounded-full">
            <Calendar className="w-3.5 h-3.5" />
            {post.publishedAt}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#141D30] tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-500">
          <div className="w-7 h-7 rounded-full bg-[#4B6AD9] text-white flex items-center justify-center font-bold text-xs">
            ص
          </div>
          <span className="font-bold text-[#141D30]">{post.author.name}</span>
          <span>•</span>
          <span>{post.author.role}</span>
        </div>
      </div>

      {/* إعلان أعلى المقال */}
      <AdSlot position="top-banner" slotId={`article-top-${post.id}`} />

      {/* المحتوى وشريط المحتويات الجانبي */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8 space-y-4 bg-white p-6 sm:p-10 rounded-3xl border border-[#D9D9D9] shadow-soft">
          {/* محتويات المقال للجوال */}
          {post.tableOfContents && (
            <div className="lg:hidden mb-6">
              <TableOfContents items={post.tableOfContents} />
            </div>
          )}

          {/* نص المقال */}
          <div className="prose prose-slate max-w-none">
            {renderContent(post.content)}
          </div>

          {/* إعلان داخل المقال */}
          <AdSlot position="in-content" slotId={`article-mid-${post.id}`} />

          {/* الأدوات المرتبطة بالمقال */}
          <RelatedTools currentToolSlug={post.relatedToolSlug} />

          {/* وسوم المقال */}
          <div className="pt-6 border-t border-[#D9D9D9]/50 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> الوسوم:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[#FAF8FF] text-slate-700 border border-[#D9D9D9]/70 px-2.5 py-1 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* الشريط الجانبي (سطح المكتب) */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6">
          {post.tableOfContents && (
            <div className="sticky top-28 space-y-6">
              <TableOfContents items={post.tableOfContents} />
              <AdSlot position="sidebar" slotId={`article-sidebar-${post.id}`} />
            </div>
          )}
        </aside>
      </div>

      {/* إعلان أسفل المقال */}
      <AdSlot position="bottom-banner" slotId={`article-bottom-${post.id}`} />

      {/* مقالات مقترحة أخرى */}
      <div className="max-w-4xl mx-auto pt-8 border-t border-[#D9D9D9] space-y-4">
        <h3 className="text-xl font-bold text-[#141D30]">
          مقالات مالية قد تهمك
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="p-5 rounded-2xl bg-white border border-[#D9D9D9] hover:border-[#4B6AD9] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-bold text-[#4B6AD9]">{p.category}</span>
                <h4 className="text-sm font-bold text-[#141D30] group-hover:text-[#4B6AD9] transition-colors mt-1">
                  {p.title}
                </h4>
              </div>
              <span className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                <span>قراءة المقال</span>
                <ArrowLeft className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
