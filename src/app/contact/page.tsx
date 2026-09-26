'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Mail, MessageSquare, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seo-config';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storePlatform: 'salla',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const breadcrumbItems = [{ name: 'تواصل معنا', url: '/contact' }];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#4B6AD9] bg-[#FAF8FF] px-3 py-1 rounded-full border border-[#B2CBF4]">
          خدمة ودعم التجار
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#141D30] tracking-tight">
          تواصل مع فريق <span className="text-[#4B6AD9]">صافي</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          لديك استفسار، اقتراح لإضافة أداة جديدة، أو ملاحظة حول الحسابات المالية؟ يسعدنا دائمًا الاستماع إليك.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* معلومات التواصل الجانبية */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#141D30] text-white space-y-6 shadow-md border border-[#26395E]">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#B2CBF4]" />
              <span>معلومات الدعم الفني</span>
            </h2>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              فريقنا التقني والمالي يعمل باستمرار على تطوير أدوات وحاسبات جديدة تساعد المتاجر العربية على النجاح.
            </p>

            <div className="space-y-3 pt-3 border-t border-[#26395E] text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#4B6AD9]/20 text-[#B2CBF4] border border-[#4B6AD9]/40 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-slate-400">البريد الإلكتروني المباشر:</span>
                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    className="font-mono text-[#B2CBF4] font-semibold hover:underline"
                  >
                    {SITE_CONFIG.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF8FF] border border-[#B2CBF4] text-xs space-y-2">
            <h3 className="font-bold text-[#141D30] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#4B6AD9]" />
              <span>تريد أداة مخصصة لمتجرك؟</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              أخبرنا عن نوع الحسابات التي تحتاجها في عملك اليومي (مثل حسابات الضرائب، حاسبات الدروب شيبينغ، أو بوابات دفع محددة) وسنعمل على إضافتها مجانًا.
            </p>
          </div>
        </div>

        {/* نموذج التواصل */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#D9D9D9] shadow-soft">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#141D30]">
                شكرًا لتواصلك معنا!
              </h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                تم استلام رسالتك بنجاح وسيقوم فريق صافي بمراجعتها والرد عليك في أقرب وقت ممكن.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    storePlatform: 'salla',
                    subject: '',
                    message: '',
                  });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#141D30] text-white text-xs font-bold hover:bg-[#26395E] transition-colors"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-[#141D30] border-b border-[#D9D9D9]/50 pb-3">
                أرسل رسالتك
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#141D30]">الاسم الكريم *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="محمد الأحمد"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D9D9] text-sm focus:outline-hidden focus:border-[#4B6AD9] focus:ring-2 focus:ring-[#4B6AD9]/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#141D30]">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@store.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D9D9] text-sm focus:outline-hidden focus:border-[#4B6AD9] focus:ring-2 focus:ring-[#4B6AD9]/20 text-left dir-ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#141D30]">منصة متجرك</label>
                  <select
                    value={formData.storePlatform}
                    onChange={(e) => setFormData({ ...formData, storePlatform: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D9D9] text-sm focus:outline-hidden focus:border-[#4B6AD9] bg-white"
                  >
                    <option value="salla">سلة (Salla)</option>
                    <option value="zid">زد (Zid)</option>
                    <option value="shopify">شوبيفاي (Shopify)</option>
                    <option value="woocommerce">ووكومرس (WooCommerce)</option>
                    <option value="other">منصة أخرى / متجر قيد الإنشاء</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#141D30]">عنوان الموضوع *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="اقتراح أداة جديدة أو استفسار"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D9D9] text-sm focus:outline-hidden focus:border-[#4B6AD9] focus:ring-2 focus:ring-[#4B6AD9]/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#141D30]">نص الرسالة *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="اكتب تفاصيل استفسارك أو اقتراحك هنا..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D9D9] text-sm focus:outline-hidden focus:border-[#4B6AD9] focus:ring-2 focus:ring-[#4B6AD9]/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl bg-[#4B6AD9] hover:bg-[#3B57C4] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                {loading ? (
                  <span>جاري الإرسال...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>إرسال الرسالة</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
