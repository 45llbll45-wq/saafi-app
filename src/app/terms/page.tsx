import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'شروط الاستخدام وإخلاء المسؤولية | صافي',
  description:
    'شروط وأحكام استخدام منصة وأدوات صافي، وإخلاء المسؤولية المالية والضريبية المتعلقة بالحاسبات.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  const breadcrumbItems = [{ name: 'شروط الاستخدام', url: '/terms' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="space-y-3 border-b border-[#D9D9D9] pb-6">
        <span className="text-xs font-bold text-[#4B6AD9] bg-[#FAF8FF] px-3 py-1 rounded-full border border-[#B2CBF4]">
          الوثائق القانونية
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#141D30] tracking-tight">
          شروط الاستخدام (Terms of Service)
        </h1>
        <p className="text-xs text-slate-500">
          آخر تحديث: 15 مارس 2026
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#D9D9D9] shadow-soft space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#141D30] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#4B6AD9]" />
            <span>1. قبول الشروط</span>
          </h2>
          <p>
            باستخدامك لمنصة صافي (Saafi.app) وأي من أدواتها أو محتواها المنشور، فإنك تقر وتوافق على الالتزام بكافة الشروط والأحكام المنصوص عليها في هذه الصفحة. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى التوقف عن استخدام الموقع.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#141D30] flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>2. إخلاء المسؤولية المالية والضريبية</span>
          </h2>
          <div className="p-4 rounded-2xl bg-[#FAF8FF] border border-[#B2CBF4] text-[#141D30] text-xs md:text-sm leading-relaxed space-y-2">
            <p>
              <strong>تنويه هام:</strong> جميع الأدوات والحاسبات والنماذج المالية والمقالات المنشورة على موقع «صافي» مقدمة لأغراض <strong>إرشادية، تقديرية، وتعليمية فقط</strong>.
            </p>
            <p>
              لا تشكل نتائج هذه الأدوات بأي حال من الأحوال استشارة محاسبية قانونية أو إقرارًا ضريبيًا رسميًا (مثل الإقرارات الضريبية لهيئة الزكاة والضريبة والجمارك أو غيرها من الهيئات التنظيمية).
            </p>
            <p>
              يتحمل المستخدم وحده المسؤولية الكاملة عن أي قرارات تسعير، تسويق، أو استثمار يتخذها لمتجره، ونوصي دائمًا باستشارة محاسب قانوني معتمد لمراجعة دفاتر متجرك الرسمية.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#141D30] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#4B6AD9]" />
            <span>3. حقوق الملكية الفكرية</span>
          </h2>
          <p>
            جميع النصوص، التصاميم، الشعارات، البرمجيات، والمقالات المنشورة في موقع صافي هي ملكية حصرية للمنصة ومحمية بموجب قوانين الملكية الفكرية وحقوق النشر. يُسمح بمشاركة المقالات وروابط الأدوات مع الإشارة الواضحة ووضع رابط مباشر إلى المصدر الأصلي.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#141D30]">
            4. تعديل الشروط
          </h2>
          <p>
            يحتفظ فريق صافي بالحق في تعديل أو تحديث شروط الاستخدام هذه في أي وقت دون إشعار مسبق. يسري مفعول التعديلات فور نشرها على هذه الصفحة.
          </p>
        </section>
      </div>
    </div>
  );
}
