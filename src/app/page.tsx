import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ProfitCalculator } from '@/components/calculators/ProfitCalculator';
import { TOOLS_LIST } from '@/data/tools-data';
import { BLOG_POSTS } from '@/data/blog-posts';
import { BlogCard } from '@/components/blog/BlogCard';
import { AdSlot } from '@/components/ads/AdSlot';
import { WebApplicationSchema, FAQSchema } from '@/components/seo/SchemaOrg';
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  Scale,
  BadgePercent,
  Tag,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Calculator,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'صافي | حاسبة أرباح التجارة الإلكترونية',
  description:
    'صافي يساعدك على معرفة ربحك الفعلي بعد خصم تكلفة المنتج والشحن ورسوم الدفع والتسويق والخصومات. أداة مجانية وسريعة لأصحاب متاجر سلة، زد، وشوبيفاي.',
  alternates: {
    canonical: '/',
  },
};

const HOME_FAQS = [
  {
    question: 'ما هو موقع صافي وما الهدف منه؟',
    answer:
      'صافي هو منصة وأداة عربية مجانية مخصصة لرواد وأصحاب المتاجر الإلكترونية في السعودية والوطن العربي، لحساب صافي الربح الحقيقي لكل منتج بدقة، وتحليل تكاليف الإعلانات، الشحن، وبوابات الدفع، لتفادي الخسائر المالية غير المحسوبة.',
  },
  {
    question: 'هل يحتاج موقع صافي إلى تسجيل حساب أو ربط متجري؟',
    answer:
      'لا، صافي مجاني 100% ويعمل مباشرة وبسرعة فائقة من متصفحك دون الحاجة لتسجيل حساب، أو إدخال بيانات بنكية، أو ربط API بمتجرك، مما يحافظ على خصوصيتك وسرية أرقامك بالكامل.',
  },
  {
    question: 'كيف يتم احتساب رسوم بوابات الدفع في الحاسبة؟',
    answer:
      'تتيح لك الحاسبة إدخال نسبة بوابة الدفع المتغيرة (مثل 1.75% لمدى أو 2.5% لفيزا وماستركارد) بالإضافة إلى الرسم الثابت لكل عملية (مثل 1 ريال)، ويتم احتسابها على إجمالي المبلغ المحصل بعد الخصم.',
  },
  {
    question: 'ما هو سعر التعادل (Break-Even Price) ولماذا هو مهم؟',
    answer:
      'سعر التعادل هو أقل سعر بيع يمكنك أن تبيع به منتجك دون تحقيق أي ربح أو تكبد أي خسارة، ومعرفته ضرورية جدًا عند تحديد أسعار العروض الترويجية والخصومات لضمان عدم بيع المنتجات بخسارة.',
  },
];

export default function HomePage() {
  const latestPosts = BLOG_POSTS.slice(0, 3);

  const getToolIcon = (name: string) => {
    switch (name) {
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-[#4B6AD9]" />;
      case 'BadgePercent':
        return <BadgePercent className="w-6 h-6 text-[#4B6AD9]" />;
      case 'Scale':
        return <Scale className="w-6 h-6 text-[#4B6AD9]" />;
      case 'Tag':
        return <Tag className="w-6 h-6 text-[#4B6AD9]" />;
      case 'TrendingUp':
      default:
        return <TrendingUp className="w-6 h-6 text-[#4B6AD9]" />;
    }
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      <WebApplicationSchema
        name="صافي - حاسبة أرباح التجارة الإلكترونية"
        description="أداة حساب صافي الأرباح الحقيقية وتحليل التكاليف لأصحاب المتاجر الإلكترونية."
        url="https://saafi.app"
        applicationCategory="BusinessApplication"
      />
      <FAQSchema faqs={HOME_FAQS} />

      {/* قسم البطل الرئيسي (Hero Section) */}
      <section className="relative pt-12 md:pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FAF8FF] border border-[#B2CBF4] text-[#4B6AD9] text-xs md:text-sm font-bold mb-6 shadow-xs">
          <span>أداة مجانية 100% وبدون تسجيل حساب</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#141D30] tracking-tight leading-[1.2] max-w-4xl mx-auto">
          احسب ربح متجرك <span className="text-[#4B6AD9]">الحقيقي</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          صافي يساعدك على معرفة ربحك الفعلي بعد خصم تكلفة المنتج والشحن ورسوم الدفع والتسويق والخصومات.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#calculator-section"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#4B6AD9] hover:bg-[#3B57C4] text-white font-black text-base shadow-lg shadow-[#4B6AD9]/25 hover:shadow-xl hover:scale-105 transition-all"
          >
            <span>احسب ربحك الآن</span>
            <ArrowLeft className="w-5 h-5 rtl:rotate-0" />
          </a>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-[#FAF8FF] text-[#141D30] font-bold text-base border border-[#D9D9D9] shadow-xs transition-colors"
          >
            <span>دليل الأرباح والتسعير</span>
          </Link>
        </div>

        {/* مميزات سريعة تحت البطل */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs md:text-sm text-slate-600 font-medium">
          <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-[#D9D9D9] shadow-xs">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>تحديث حسابي فوري</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-[#D9D9D9] shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>سرية تامة لأرقامك</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-[#D9D9D9] shadow-xs">
            <Scale className="w-4 h-4 text-[#4B6AD9]" />
            <span>حساب نقطة التعادل</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-[#D9D9D9] shadow-xs">
            <Tag className="w-4 h-4 text-[#4B6AD9]" />
            <span>محاكي العروض والخصومات</span>
          </div>
        </div>
      </section>

      {/* مساحة إعلانية علوية */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot position="top-banner" slotId="home-top" />
      </div>

      {/* قسم الحاسبة التفاعلية الرئيسية */}
      <section id="calculator-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <ProfitCalculator />
      </section>

      {/* قسم شبكة الأدوات المالية المجانية */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-[#141D30]">
            أدوات مالية مجانية لكل صاحب متجر إلكتروني
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            اختر الأداة المناسبة لاحتياجك، كل أداة مصممة لحل تحدٍ مالي محدد في متجرك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS_LIST.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.path}
              className="bg-white rounded-3xl p-6 border border-[#D9D9D9] shadow-soft shadow-hover flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8FF] border border-[#DED1FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getToolIcon(tool.iconName)}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-[#141D30] group-hover:text-[#4B6AD9] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D9D9D9]/50 flex items-center justify-between text-xs font-bold text-[#4B6AD9]">
                <span>استخدم الأداة الآن</span>
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* مساحة إعلانية وسطى */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot position="in-content" slotId="home-mid" />
      </div>

      {/* قسم المقالات وأحدث النصائح */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#141D30]">
              أحدث المقالات والأدلة المالية
            </h2>
            <p className="text-sm text-slate-600">
              مقالات عملية ومبسطة تساعدك على رفع أرباح متجرك وتجنب الأخطاء المحاسبية
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4B6AD9] hover:text-[#26395E] self-start md:self-auto"
          >
            <span>عرض كافة المقالات (10)</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* قسم الأسئلة الشائعة (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#141D30]">
            الأسئلة الشائعة حول حساب أرباح المتاجر
          </h2>
          <p className="text-sm text-slate-600">
            إجابات واضحة ومباشرة على أكثر الاستفسارات المالية تكرارًا
          </p>
        </div>

        <div className="space-y-4">
          {HOME_FAQS.map((faq, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white border border-[#D9D9D9] shadow-xs space-y-2"
            >
              <h3 className="text-base font-bold text-[#141D30] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#4B6AD9] shrink-0" />
                <span>{faq.question}</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed ps-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* مساحة إعلانية سفلية */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot position="bottom-banner" slotId="home-bottom" />
      </div>
    </div>
  );
}
