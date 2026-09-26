'use client';

import React, { useState } from 'react';
import { BreakEvenInputs } from '@/lib/types';
import { calculateBreakEven } from '@/lib/calculations';
import { InputNumber } from '@/components/ui/InputNumber';
import { ResultStat } from '@/components/ui/ResultStat';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatters';
import { copyToClipboard } from '@/lib/clipboard';
import { Scale, Sparkles, Check, Copy, AlertTriangle, HelpCircle, RotateCcw } from 'lucide-react';

const DEFAULT_BREAKEVEN_INPUTS: BreakEvenInputs = {
  fixedCosts: 5000,
  sellingPrice: 120,
  productCost: 40,
  shippingCost: 15,
  marketingCost: 15,
  paymentFeePercent: 2.5,
  paymentFeeFixed: 1.0,
};

export const BreakEvenCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<BreakEvenInputs>(DEFAULT_BREAKEVEN_INPUTS);
  const [copied, setCopied] = useState(false);
  const currency = 'ر.س';

  const updateInput = (key: keyof BreakEvenInputs, val: number) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_BREAKEVEN_INPUTS);
  };

  const result = calculateBreakEven(inputs);

  const handleCopy = async () => {
    const text = `⚖️ نتيجة تحليل نقطة التعادل من صافي:
عدد وحدات التعادل الشهرية: ${formatNumber(result.breakEvenUnits)} طلب
إجمالي إيرادات التعادل: ${formatCurrency(result.breakEvenRevenue, currency)}
هامش المساهمة للوحدة: ${formatCurrency(result.unitContributionMargin, currency)}
نسبة هامش المساهمة: ${formatPercent(result.contributionMarginRatio)}
احسب نقطة تعادل متجرك مجانًا: https://saafi.app/break-even-calculator`;
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
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold">حاسبة نقطة التعادل للمتجر</h2>
              <p className="text-xs text-[#B0B0B0]">
                اعرف عدد الطلبات والإيرادات الشهرية المطلوبة لتغطية كافة مصاريفك وبدء الربح
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
              التكاليف الثابتة والمتغيرة
            </h3>

            <div className="p-4 rounded-2xl bg-[#FAF8FF] border border-[#DED1FF]">
              <InputNumber
                id="be_fixedCosts"
                label="إجمالي التكاليف الثابتة الشهرية (Fixed Costs)"
                value={inputs.fixedCosts}
                onChange={(v) => updateInput('fixedCosts', v)}
                unit={currency}
                helpText="المصاريف الشهرية الإلزامية مثل باقة المتجر (سلة/زد)، الرواتب، إيجار المستودع، والتطبيقات."
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputNumber
                id="be_sellingPrice"
                label="سعر بيع الوحدة"
                value={inputs.sellingPrice}
                onChange={(v) => updateInput('sellingPrice', v)}
                unit={currency}
                required
              />

              <InputNumber
                id="be_productCost"
                label="تكلفة شراء وتوريد الوحدة"
                value={inputs.productCost}
                onChange={(v) => updateInput('productCost', v)}
                unit={currency}
                required
              />

              <InputNumber
                id="be_shippingCost"
                label="تكلفة الشحن للطلب"
                value={inputs.shippingCost}
                onChange={(v) => updateInput('shippingCost', v)}
                unit={currency}
              />

              <InputNumber
                id="be_marketingCost"
                label="تكلفة التسويق للطلب (CPA)"
                value={inputs.marketingCost}
                onChange={(v) => updateInput('marketingCost', v)}
                unit={currency}
              />
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8FF] border border-[#D9D9D9] grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InputNumber
                id="be_paymentPercent"
                label="نسبة بوابة الدفع"
                value={inputs.paymentFeePercent}
                onChange={(v) => updateInput('paymentFeePercent', v)}
                unit="%"
                step={0.1}
              />
              <InputNumber
                id="be_paymentFixed"
                label="رسم العملية الثابت"
                value={inputs.paymentFeeFixed}
                onChange={(v) => updateInput('paymentFeeFixed', v)}
                unit={currency}
                step={0.5}
              />
            </div>
          </div>

          {/* النتائج */}
          <div className="lg:col-span-5 bg-[#FAF8FF]/60 p-5 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-2">
                <h3 className="text-sm font-bold text-[#141D30] uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#4B6AD9]" />
                  <span>نتائج نقطة التعادل</span>
                </h3>
              </div>

              {!result.isPossible ? (
                <div className="p-4 rounded-xl bg-rose-50 border border-[#FF7373] text-rose-800 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#FF7373] shrink-0" />
                  <span>{result.message}</span>
                </div>
              ) : (
                <>
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#141D30] to-[#26395E] text-white shadow-md border border-[#26395E]">
                    <span className="text-xs font-medium text-[#B2CBF4] uppercase tracking-wider block">
                      عدد الطلبات الشهرية المطلوبة للتعادل
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl md:text-5xl font-extrabold font-mono text-[#B2CBF4]">
                        {formatNumber(result.breakEvenUnits, 'ar-SA', 0)}
                      </span>
                      <span className="text-sm text-slate-300">طلب / شهريًا</span>
                    </div>
                    <span className="text-xs text-slate-400 mt-2 block border-t border-[#26395E] pt-2">
                      أي بمعدل حوالي <strong>{Math.ceil(result.breakEvenUnits / 30)} طلبات يوميًا</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <ResultStat
                      label="إيرادات التعادل الشهرية"
                      value={formatCurrency(result.breakEvenRevenue, currency)}
                      subValue="المبيعات اللازمة لتغطية المصاريف"
                      size="sm"
                    />

                    <ResultStat
                      label="هامش المساهمة للطلب"
                      value={formatCurrency(result.unitContributionMargin, currency)}
                      subValue={`نسبة ${formatPercent(result.contributionMarginRatio)}`}
                      size="sm"
                      badge="Contribution"
                    />

                    <ResultStat
                      label="إجمالي التكلفة المتغيرة"
                      value={formatCurrency(result.unitVariableCost, currency)}
                      subValue="لكل طلب يتم شحنه"
                      size="sm"
                    />

                    <ResultStat
                      label="التكاليف الثابتة"
                      value={formatCurrency(inputs.fixedCosts, currency)}
                      subValue="شهرياً"
                      size="sm"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8FF] border border-[#B2CBF4] text-[#141D30] text-xs leading-relaxed">
              {result.isPossible ? (
                <>
                  💡 <strong>قاعدة النجاح:</strong> كل طلب تبيعه فوق{' '}
                  <strong className="text-[#4B6AD9]">{formatNumber(result.breakEvenUnits, 'ar-SA', 0)} طلب</strong> سيضيف في جيبك صافي ربح قدره{' '}
                  <strong className="text-[#4B6AD9]">{formatCurrency(result.unitContributionMargin, currency)}</strong> بالكامل!
                </>
              ) : (
                <>
                  ⚠️ <strong>تنبيه مالي:</strong> لتتمكن من الوصول لنقطة التعادل وتغطية مصاريفك، يجب أن يكون سعر البيع أعلى من إجمالي التكاليف المتغيرة للوحدة.
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
