'use client';

import React, { useState } from 'react';
import { DiscountImpactInputs } from '@/lib/types';
import { calculateDiscountImpact } from '@/lib/calculations';
import { InputNumber } from '@/components/ui/InputNumber';
import { ResultStat } from '@/components/ui/ResultStat';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatters';
import { copyToClipboard } from '@/lib/clipboard';
import { Tag, Sparkles, Check, Copy, AlertTriangle, TrendingDown, RotateCcw } from 'lucide-react';

const DEFAULT_DISCOUNT_INPUTS: DiscountImpactInputs = {
  currentPrice: 150,
  unitCost: 80,
  plannedDiscountPercent: 20,
  currentMonthlyUnits: 100,
};

export const DiscountCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<DiscountImpactInputs>(DEFAULT_DISCOUNT_INPUTS);
  const [copied, setCopied] = useState(false);
  const currency = 'ر.س';

  const updateInput = (key: keyof DiscountImpactInputs, val: number) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_DISCOUNT_INPUTS);
  };

  const result = calculateDiscountImpact(inputs);

  const handleCopy = async () => {
    const text = `🏷️ نتيجة تحليل تأثير الخصم من صافي:
سعر البيع بعد الخصم (${inputs.plannedDiscountPercent}%): ${formatCurrency(result.discountedPrice, currency)}
الزيادة المطلوبة في المبيعات للحفاظ على الأرباح: +${formatPercent(result.requiredSalesIncreasePercent)} (${formatNumber(result.requiredUnitsToMaintainProfit)} طلب)
تراجع ربح القطعة الواحدة: -${formatPercent(result.marginDropPercent)}
احسب تأثير خصوماتك: https://saafi.app/discount-calculator`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-3xl border border-[#D9D9D9] shadow-soft overflow-hidden">
        {/* رأس الأداة */}
        <div className="bg-[#141D30] text-white p-5 md:px-8 md:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26395E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4B6AD9]/20 text-[#B2CBF4] border border-[#4B6AD9]/40 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold">حاسبة تأثير الخصومات والعروض</h2>
              <p className="text-xs text-[#B0B0B0]">
                اكتشف كمية المبيعات الإضافية المطلوبة لتعويض الخصم وتفادي تآكل أرباحك
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#26395E] hover:bg-[#26395E]/80 text-[#FAF8FF] text-xs font-semibold border border-[#4B6AD9]/40 transition-colors"
              title="نسخ النتيجة"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ' : 'نسخ النتيجة'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#26395E] hover:bg-[#26395E]/80 text-[#B0B0B0] hover:text-white text-xs font-semibold border border-[#26395E] transition-colors"
              title="إعادة تعيين للأرقام الافتراضية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط</span>
            </button>
          </div>
        </div>

        {/* جسم الأداة */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-[#D9D9D9]">
          {/* المدخلات */}
          <div className="lg:col-span-7 p-5 md:p-8 space-y-5">
            <h3 className="text-sm font-bold text-[#141D30] uppercase tracking-wide flex items-center gap-2 border-b border-[#D9D9D9]/50 pb-2">
              <span className="w-2 h-2 rounded-full bg-[#4B6AD9]"></span>
              بيانات المنتج والعرض الترويجي
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputNumber
                id="disc_currentPrice"
                label="سعر البيع الحالي (قبل الخصم)"
                value={inputs.currentPrice}
                onChange={(v) => updateInput('currentPrice', v)}
                unit={currency}
                required
              />

              <InputNumber
                id="disc_unitCost"
                label="إجمالي التكلفة المتغيرة للوحدة"
                value={inputs.unitCost}
                onChange={(v) => updateInput('unitCost', v)}
                unit={currency}
                helpText="تشمل: تكلفة المنتج + الشحن + التسويق + رسوم الدفع."
                required
              />

              <InputNumber
                id="disc_plannedDiscount"
                label="نسبة الخصم المخطط لها %"
                value={inputs.plannedDiscountPercent}
                onChange={(v) => updateInput('plannedDiscountPercent', v)}
                unit="%"
                min={0}
                max={99}
                required
              />

              <InputNumber
                id="disc_currentUnits"
                label="حجم المبيعات الشهرية الحالي"
                value={inputs.currentMonthlyUnits}
                onChange={(v) => updateInput('currentMonthlyUnits', v)}
                unit="طلب"
                min={1}
                helpText="عدد الطلبات التي تبيعها حاليًا قبل الخصم."
              />
            </div>

            {/* أزرار سريعة للخصومات الشهيرة */}
            <div className="flex items-center gap-2 flex-wrap pt-2">
              <span className="text-xs text-[#B0B0B0] font-medium">اختر نسبة خصم:</span>
              {[5, 10, 15, 20, 25, 30, 40].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => updateInput('plannedDiscountPercent', pct)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    inputs.plannedDiscountPercent === pct
                      ? 'bg-[#4B6AD9] text-white shadow-xs'
                      : 'bg-[#FAF8FF] text-[#141D30] hover:bg-[#DED1FF]/60 border border-[#D9D9D9]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* النتائج */}
          <div className="lg:col-span-5 bg-[#FAF8FF]/60 p-5 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-2">
                <h3 className="text-sm font-bold text-[#141D30] uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#4B6AD9]" />
                  <span>تأثير الخصم على متجرك</span>
                </h3>
              </div>

              {result.isLossMaking ? (
                <div className="p-4 rounded-xl bg-rose-50 border border-[#FF7373] text-rose-900 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#FF7373] shrink-0" />
                  <div>
                    <strong>تحذير خطير:</strong> الخصم يجعل سعر البيع أقل من التكلفة! كل عملية بيع ستسبب خسارة مؤكدة.
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#141D30] to-[#26395E] text-white shadow-md border border-[#26395E]">
                    <span className="text-xs font-bold uppercase tracking-wider block text-[#B2CBF4]">
                      الزيادة المطلوبة في المبيعات لتعويض الخصم
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl md:text-5xl font-extrabold font-mono tracking-tight text-white">
                        +{formatPercent(result.requiredSalesIncreasePercent)}
                      </span>
                    </div>
                    <span className="text-xs text-slate-300 mt-2 block border-t border-[#26395E] pt-2 font-medium">
                      يجب أن تبيع <strong className="text-[#B2CBF4]">{formatNumber(result.requiredUnitsToMaintainProfit)} طلب</strong> بدلًا من {inputs.currentMonthlyUnits} طلب للحفاظ على نفس الربح!
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <ResultStat
                      label="السعر بعد الخصم"
                      value={formatCurrency(result.discountedPrice, currency)}
                      subValue={`خصم ${inputs.plannedDiscountPercent}%`}
                      size="sm"
                    />

                    <ResultStat
                      label="ربح القطعة بعد الخصم"
                      value={formatCurrency(result.discountedMarginPerUnit, currency)}
                      subValue={`كان ${formatCurrency(result.originalMarginPerUnit, currency)}`}
                      size="sm"
                      badge={`-${formatPercent(result.marginDropPercent)}`}
                      badgeVariant="danger"
                    />

                    <ResultStat
                      label="إجمالي الربح الحالي"
                      value={formatCurrency(result.originalMonthlyProfit, currency)}
                      subValue="شهرياً قبل الخصم"
                      size="sm"
                    />

                    <ResultStat
                      label="نسبة تراجع ربح القطعة"
                      value={formatPercent(result.marginDropPercent)}
                      subValue="فقدان من هامش الربح"
                      size="sm"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8FF] border border-[#B2CBF4] text-[#141D30] text-xs leading-relaxed">
              {!result.isLossMaking ? (
                <>
                  ⚠️ <strong>حقيقة تسويقية:</strong> إذا كان من غير المرجح أن يؤدي الخصم إلى زيادة المبيعات بنسبة{' '}
                  <strong className="text-[#4B6AD9]">+{formatPercent(result.requiredSalesIncreasePercent)}</strong>، فاستبدل كود الخصم بعرض "شحن مجاني" أو "هدية تكميلية" للحفاظ على أرباحك.
                </>
              ) : (
                <>
                  🛑 <strong>تنبيه الخصومات:</strong> عندما يكون سعر البيع بعد الخصم أقل من تكلفة الوحدة، فإن زيادة المبيعات ستضاعف الخسائر بدلاً من تعويضها. يُنصح بخفض نسبة الخصم فوراً.
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
