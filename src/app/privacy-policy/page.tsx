import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { ShieldCheck, Lock, Cookie, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | صافي - حماية بياناتك وأمان استخدام الأدوات',
  description:
    'سياسة الخصوصية لمنصة صافي. نلتزم بأعلى معايير الشفافية وحماية خصوصية مستخدمينا وزوار موقعنا ومعايير ملفات تعريف الارتباط والإعلانات.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [{ name: 'سياسة الخصوصية', url: '/privacy-policy' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="space-y-3 border-b border-[#D9D9D9] pb-6">
        <span className="text-xs font-bold text-[#4B6AD9] bg-[#FAF8FF] px-3 py-1 rounded-full border border-[#B2CBF4]">
          الوثائق القانونية
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#141D30] tracking-tight">
          سياسة الخصوصية (Privacy Policy)
        </h1>
        <p className="text-xs text-slate-500">
          آخر تحديث: 15 مارس 2026
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#D9D9D9] shadow-soft space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#141D30] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#4B6AD9]" />
            <span>1. مقدمة والتزامنا بالخصوصية</span>
          </h2>
          <p>
            في منصة <strong>صافي (Saafi.app)</strong>، نضع خصوصية زوارنا وأمان بياناتهم في مقدمة أولوياتنا. توضح هذه الوثيقة طبيعة المعلومات التي قد يتم جمعها عند زيارتك للموقع وكيفية استخدامها وحمايتها.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#141D30] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#4B6AD9]" />
            <span>2. البيانات والحسابات المالية المدخلة</span>
          </h2>
          <p>
            نؤكد أن جميع الأرقام والأسعار والتكاليف التي تدخلها في حاسبات صافي (مثل سعر المنتج، تكلفة الشحن، ميزانيات الإعلانات، ونسب الخصم) يتم حسابها ومعالجتها محليًا في متصفحك الخاص (Client-Side). <strong>نحن لا نقوم بتسجيل أو حفظ أو نقل أي من أرقام مبيعاتك أو بيانات متجرك إلى أي خوادم خارجية</strong>.
          </p>
          <p>
            قد نقوم فقط باستخدام ميزة التخزين المحلي في متصفحك (localStorage) لحفظ آخر أرقام أدخلتها تيسيرًا عليك عند إعادة فتح الحاسبة، ويمكنك مسحها في أي وقت بالضغط على زر «إعادة ضبط».
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#141D30] flex items-center gap-2">
            <Cookie className="w-5 h-5 text-[#4B6AD9]" />
            <span>3. ملفات تعريف الارتباط (Cookies) وإعلانات Google</span>
          </h2>
          <p>
            يستخدم موقع صافي ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم وتحليل حركة المرور العامة للموقع عبر أدوات التحليل المعتمدة مثل Google Analytics.
          </p>
          <div className="p-4 rounded-2xl bg-[#FAF8FF] border border-[#D9D9D9] space-y-2 text-xs">
            <h3 className="font-bold text-[#141D30]">إفصاح إعلانات Google AdSense:</h3>
            <ul className="list-disc ps-5 space-y-1 text-slate-600">
              <li>تستخدم Google، بصفتها مورِّدًا من طرف ثالث، ملفات تعريف ارتباط (مثل ملف تعريف الارتباط DART) لعرض الإعلانات على موقعنا.</li>
              <li>يتيح استخدام Google لملفات تعريف الارتباط عرض إعلانات للمستخدمين استنادًا إلى زياراتهم لموقعنا ومواقع أخرى على الإنترنت.</li>
              <li>يمكن للمستخدمين إلغاء الاشتراك في استخدام ملف تعريف الارتباط DART بزيارة سياسة الخصوصية الخاصة بإعلانات Google وشبكة المحتوى على الرابط: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#4B6AD9] underline">policies.google.com/technologies/ads</a>.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#141D30] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#4B6AD9]" />
            <span>4. ملفات السجل (Log Files)</span>
          </h2>
          <p>
            مثل معظم مواقع الويب، يتبع موقع صافي نظامًا قياسيًا لاستخدام ملفات السجل. تسجل هذه الملفات الزوار عند زيارتهم للمواقع، وتشمل المعلومات التي تجمعها عناوين بروتوكول الإنترنت (IP)، نوع المتصفح، مزود خدمة الإنترنت (ISP)، طابع التاريخ/الوقت، صفحات الإحالة/الخروج، وعدد النقرات. لا ترتبط هذه المعلومات بأي معلومات قابلة للتعريف الشخصي، والغرض منها هو تحليل الاتجاهات وإدارة الموقع.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#141D30]">
            5. حقوق المستخدم والموافقة
          </h2>
          <p>
            باستخدامك لموقع صافي، فإنك توافق بموجب هذا على سياسة الخصوصية الخاصة بنا وتوافق على شروطها.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-[#D9D9D9]/50">
          <h2 className="text-lg font-bold text-[#141D30]">
            6. تواصل معنا
          </h2>
          <p>
            إذا كان لديك أي أسئلة أو استفسارات إضافية حول سياسة الخصوصية الخاصة بنا، فلا تتردد في مراسلتنا عبر صفحة <a href="/contact" className="text-[#4B6AD9] underline font-semibold">تواصل معنا</a> أو عبر البريد الإلكتروني: <span className="font-mono font-bold text-[#4B6AD9]">contact@saafi.app</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
