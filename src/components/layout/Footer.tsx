import React from 'react';
import Link from 'next/link';
import { Calculator, Heart, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { TOOLS_LIST } from '@/data/tools-data';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#141D30] text-[#FAF8FF] border-t border-[#26395E] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#26395E]">
          {/* العمود 1: عن صافي */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#4B6AD9] flex items-center justify-center text-white shadow-md shadow-[#4B6AD9]/20">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                صافي <span className="text-[#B2CBF4]">| Saafi</span>
              </span>
            </Link>
            <p className="text-sm text-[#B0B0B0] leading-relaxed max-w-sm">
              المنصة العربية الأولى المتخصصة في حساب الأرباح الحقيقية وتحليل التكاليف لأصحاب المتاجر الإلكترونية (سلة، زد، شوبيفاي). احسب ربحك بدقة، وسعّر منتجاتك، وتجنب الخسارة قبل إطلاق حملاتك الإعلانية.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#B2CBF4] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#4B6AD9]" />
              <span>مجاني 100% ولا يتطلب تسجيل حساب</span>
            </div>
          </div>

          {/* العمود 2: الحاسبات والأدوات */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              الأدوات المالية
            </h3>
            <ul className="space-y-2 text-sm">
              {TOOLS_LIST.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.path}
                    className="text-[#B0B0B0] hover:text-[#B2CBF4] transition-colors block py-0.5"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود 3: المدونة والمقالات */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              مدونة صافي
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog/how-to-calculate-ecommerce-net-profit"
                  className="text-[#B0B0B0] hover:text-[#B2CBF4] transition-colors block py-0.5"
                >
                  حساب صافي ربح المتجر
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/what-is-profit-margin-and-how-to-calculate-it"
                  className="text-[#B0B0B0] hover:text-[#B2CBF4] transition-colors block py-0.5"
                >
                  الفرق بين Margin و Markup
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-to-price-ecommerce-products-for-profitability"
                  className="text-[#B0B0B0] hover:text-[#B2CBF4] transition-colors block py-0.5"
                >
                  تسعير منتجات المتجر
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-discounts-impact-ecommerce-profits"
                  className="text-[#B0B0B0] hover:text-[#B2CBF4] transition-colors block py-0.5"
                >
                  تأثير الخصومات على الأرباح
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#B2CBF4] font-semibold hover:underline block py-0.5"
                >
                  تصفح جميع المقالات (10) ←
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 4: روابط سريعة وقانونية */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              روابط مهمة
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-[#B0B0B0] hover:text-[#B2CBF4] transition-colors block py-0.5">
                  عن صافي
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#B0B0B0] hover:text-[#B2CBF4] transition-colors block py-0.5">
                  تواصل معنا
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[#B0B0B0] hover:text-[#B2CBF4] transition-colors block py-0.5">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#B0B0B0] hover:text-[#B2CBF4] transition-colors block py-0.5">
                  شروط الاستخدام
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* حقوق النشر والتنويه القانوني */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#B0B0B0]">
          <p>
            جميع الحقوق محفوظة © {currentYear} لمنصة <strong>صافي (Saafi)</strong>. صُنعت بكل{' '}
            <Heart className="w-3.5 h-3.5 text-[#FF7373] inline fill-[#FF7373]" /> لدعم تجار التجارة الإلكترونية في الوطن العربي.
          </p>
          <p className="text-slate-400 text-center md:text-left">
            إخلاء مسؤولية: الأرقام والحسابات المقدمة هي أغراض استرشادية وتقديرية لدعم اتخاذ القرارات التجارية.
          </p>
        </div>
      </div>
    </footer>
  );
};
