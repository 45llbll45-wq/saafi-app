import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { Calculator, ShieldCheck, Target, Heart, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'عن صافي | رسالتنا ورؤيتنا في مساعدة تجار التجارة الإلكترونية',
  description:
    'تعرف على منصة صافي (Saafi)، قصتنا، ورسالتنا في مساعدة أصحاب المتاجر الإلكترونية على حساب الأرباح الحقيقية وإدارة التكاليف بذكاء ودقة.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const breadcrumbItems = [{ name: 'عن صافي', url: '/about' }];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      {/* رأس الصفحة */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-[#141D30] tracking-tight">
          صافي <span className="text-[#4B6AD9]">| Saafi</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          المنصة العربية المتخصصة في حساب الأرباح الحقيقية، تسعير المنتجات، والتحليل المالي الدقيق لأصحاب المتاجر الإلكترونية في العالم العربي.
        </p>
      </div>

      {/* القصة والرسالة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base">
          <h2 className="text-2xl font-bold text-[#141D30]">
            لماذا أنشأنا «صافي»؟
          </h2>
          <p>
            لاحظنا خلال السنوات الأخيرة أن الكثير من رواد التجارة الإلكترونية يحققون مبيعات مذهلة ويسجلون أرقامًا كبيرة في لوحات التحكم، لكنهم يفاجأون في نهاية الشهر بأن الأرباح الصافية الحقيقية تكاد تنعدم، أو أنهم يبيعون بخسارة مستترة!
          </p>
          <p>
            تآكل الأرباح يحدث بسبب <strong>التكاليف الخفية</strong>: رسوم بوابات الدفع الإلكترونية، تكلفة شحن البوليصات، ميزانيات الإعلانات المتغيرة، والتخفيضات غير المحسوبة.
          </p>
          <p>
            لذلك صممنا <strong>صافي</strong> لتكون الأداة المالية المجانية التي تمنحك الحقيقة المجردة لأرقامك بضغطة زر وبدون أي تعقيد.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#141D30] to-[#26395E] text-white space-y-6 shadow-xl border border-[#26395E]">
          <div className="w-12 h-12 rounded-2xl bg-[#4B6AD9]/20 text-[#B2CBF4] border border-[#4B6AD9]/40 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">رؤيتنا ورسالتنا</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              تمكين كل صاحب متجر إلكتروني عربي من اتخاذ قرارات تسعير وتسويق مبنية على رياضيات مالية صلبة تضمن استدامة تجارته ونمو أرباحه.
            </p>
          </div>
          <div className="pt-4 border-t border-[#26395E] flex items-center gap-4 text-xs text-[#B2CBF4]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>أدوات مجانية 100%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>دقة رياضية متناهية</span>
            </div>
          </div>
        </div>
      </div>

      {/* مبادئنا الأساسية */}
      <div className="space-y-6 pt-8 border-t border-[#D9D9D9]">
        <h2 className="text-2xl font-bold text-[#141D30] text-center">
          المعايير التي نلتزم بها في صافي
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#D9D9D9] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8FF] border border-[#B2CBF4] text-[#4B6AD9] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-[#141D30]">السرعة والبساطة</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              لا نريد إشغالك بتسجيل الدخول أو ملء عشرات الحقول غير الضرورية. أدخل أرقامك، واعرف نتيجتك فورًا.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D9D9D9] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8FF] border border-[#B2CBF4] text-[#4B6AD9] flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-[#141D30]">الخصوصية والأمان</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              جميع الحسابات الرياضية تتم على جهازك محليًا في المتصفح، ولا نقوم بتخزين أو مشاركة أرقام مبيعاتك مع أي جهة.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D9D9D9] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8FF] border border-[#B2CBF4] text-[#4B6AD9] flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-[#141D30]">ملاءمة السوق العربي</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              صممنا الأدوات لتلائم واقع التجارة في السعودية والخليج (مدى، تابي، تمارا، رسوم الشحن والتوصيل، وطبيعة الإعلانات).
            </p>
          </div>
        </div>
      </div>

      {/* دعوة لاستخدام الأدوات */}
      <div className="p-8 rounded-3xl bg-[#FAF8FF] border border-[#B2CBF4] text-center space-y-4">
        <h2 className="text-xl font-bold text-[#141D30]">
          جاهز لمعرفة أرباح متجرك الحقيقية؟
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          جرب حاسبة صافي الأرباح الرئيسية الآن واحصل على تحليل مالي شامل لمنتجك في أقل من دقيقة.
        </p>
        <Link
          href="/profit-calculator"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4B6AD9] hover:bg-[#3B57C4] text-white font-bold text-sm shadow-md transition-all"
        >
          <span>جرب الحاسبة الآن</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
