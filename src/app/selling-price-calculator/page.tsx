import React from 'react';
import { Metadata } from 'next';
import { SellingPriceCalculator } from '@/components/calculators/SellingPriceCalculator';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { WebApplicationSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { TOOLS_LIST } from '@/data/tools-data';
import { AdSlot } from '@/components/ads/AdSlot';
import { CheckCircle2, HelpCircle, BookOpen } from 'lucide-react';

const toolData = TOOLS_LIST.find((t) => t.slug === 'selling-price-calculator')!;

export const metadata: Metadata = {
  title: toolData.metaTitle,
  description: toolData.metaDescription,
  alternates: {
    canonical: '/selling-price-calculator',
  },
};

export default function SellingPriceCalculatorPage() {
  const breadcrumbItems = [{ name: toolData.title, url: '/selling-price-calculator' }];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <WebApplicationSchema
        name={toolData.title}
        description={toolData.metaDescription}
        url="https://saafi.app/selling-price-calculator"
        applicationCategory="BusinessApplication"
      />
      <FAQSchema faqs={toolData.faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-[#141D30] tracking-tight">
          {toolData.title}
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
          {toolData.shortDescription}
        </p>
      </div>

      <AdSlot position="top-banner" slotId="selling-calc-top" />

      <SellingPriceCalculator />

      <AdSlot position="in-content" slotId="selling-calc-mid" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#D9D9D9]">
        <div className="bg-white rounded-3xl p-6 border border-[#D9D9D9] shadow-soft space-y-4">
          <h2 className="text-lg font-bold text-[#141D30] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#4B6AD9]" />
            <span>كيف تسعّر منتجاتك خطوة بخطوة؟</span>
          </h2>
          <div className="space-y-3">
            {toolData.howToUse.map((step) => (
              <div key={step.step} className="flex items-start gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#FAF8FF] border border-[#B2CBF4] text-[#4B6AD9] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {step.step}
                </span>
                <div>
                  <strong className="block text-[#141D30]">{step.title}</strong>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#D9D9D9] shadow-soft space-y-4">
          <h2 className="text-lg font-bold text-[#141D30] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#4B6AD9]" />
            <span>معادلة التسعير المستهدف</span>
          </h2>
          <div className="p-3.5 rounded-xl bg-[#141D30] text-[#B2CBF4] font-mono text-xs leading-relaxed dir-ltr text-left border border-[#26395E]">
            {toolData.formulaExplanation.formula}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {toolData.formulaExplanation.description}
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600 border-t border-[#D9D9D9]/50 pt-3">
            {toolData.formulaExplanation.terms.map((t, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <strong className="text-[#141D30]">{t.name}:</strong>
                <span>{t.meaning}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[#FAF8FF] rounded-3xl p-6 md:p-8 border border-[#D9D9D9] space-y-4">
        <h2 className="text-xl font-bold text-[#141D30]">
          أسئلة شائعة حول تسعير المنتجات
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolData.faqs.map((faq, index) => (
            <div key={index} className="p-4 rounded-2xl bg-white border border-[#D9D9D9] shadow-xs space-y-2">
              <h3 className="text-sm font-bold text-[#141D30] flex items-start gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#4B6AD9] shrink-0 mt-0.5" />
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
