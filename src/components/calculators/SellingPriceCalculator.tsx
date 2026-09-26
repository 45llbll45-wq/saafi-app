'use client';

import React, { useState } from 'react';
import { SellingPriceInputs } from '@/lib/types';
import { calculateSellingPrice } from '@/lib/calculations';
import { InputNumber } from '@/components/ui/InputNumber';
import { ResultStat } from '@/components/ui/ResultStat';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { copyToClipboard } from '@/lib/clipboard';
import { BadgePercent, Sparkles, Check, Copy, AlertTriangle, RotateCcw } from 'lucide-react';

const DEFAULT_SELLING_INPUTS: SellingPriceInputs = {
  productCost: 35,
  shippingCost: 10,
  marketingCost: 15,
  paymentFeePercent: 2.5,
  paymentFeeFixed: 1.0,
  targetMarginPercent: 25,
};

export const SellingPriceCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<SellingPriceInputs>(DEFAULT_SELLING_INPUTS);
  const [copied, setCopied] = useState(false);
  const currency = 'ر.س';

  const updateInput = (key: keyof SellingPriceInputs, val: number) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_SELLING_INPUTS);
  };

  const result = calculateSellingPrice(inputs);

  const handleCopy = async () => {
    const text = `🏷️ نتيجة حاسبة تسعير المنتج من صافي:
سعر البيع المقترح: ${formatCurrency(result.targetSellingPrice, currency)}
هامش الربح المستهدف: ${formatPercent(inputs.targetMarginPercent)}
صافي الربح المتوقع: ${formatCurrency(result.expectedNetProfit, currency)}
نسبة المارك أب (Markup): ${formatPercent(result.markupPercent)}
احسب تسعيرك بدقة: https://saafi.app/selling-price-calculator`;
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
        <div className="bg-[#141D30] text-white p-5 md:px-8 md:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4B6AD9]/20 text-[#B2CBF4] border border-[#4B6AD9]/30 flex items-center justify-center shrink-0">
              <BadgePercent className="w-5 h-5 text-[#B2CBF4]" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold">حاسبة تسعير المنتج وهامش الربح</h2>
              <p className="text-xs text-[#B0B0B0]">
                حدد سعر البيع المثالي الذي يغطي تكاليفك ويحقق لك الهامش الصافي المطلوب
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
            <h3 className="text-sm font-bold text-[#141D30] uppercase tracking-wide flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-2 h-2 rounded-full bg-[#4B6AD9]"></span>
              تكاليف الوحدة وهامش الربح المطلوب
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputNumber
                id="sp_productCost"
                label="تكلفة شراء وتوريد المنتج (COGS)"
                value={inputs.productCost}
                onChange={(v) => updateInput('productCost', v)}
                unit={currency}
                helpText="تكلفة القطعة الواحدة واصلة لمستودعك."
                required
              />

              <InputNumber
                id="sp_shippingCost"
                label="تكلفة الشحن والتغليف"
                value={inputs.shippingCost}
                onChange={(v) => updateInput('shippingCost', v)}
                unit={currency}
                helpText="قيمة بوليصة الشحن وكرتون التغليف."
              />

              <InputNumber
                id="sp_marketingCost"
                label="تكلفة التسويق المقدرة (CPA)"
                value={inputs.marketingCost}
                onChange={(v) => updateInput('marketingCost', v)}
                unit={currency}
                helpText="ميزانية الإعلانات المخصصة لكل طلب."
              />

              <InputNumber
                id="sp_targetMargin"
                label="هامش صافي الربح المطلوب %"
                value={inputs.targetMarginPercent}
                onChange={(v) => updateInput('targetMarginPercent', v)}
                unit="%"
                min={1}
                max={85}
                helpText="النسبة المئوية التي تريد تحقيقها كصافي ربح من سعر البيع."
                required
              />
            </div>

            {/* رسوم الدفع */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8FF] border border-[#B2CBF4]/40 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InputNumber
                id="sp_paymentPercent"
                label="نسبة بوابة الدفع"
                value={inputs.paymentFeePercent}
                onChange={(v) => updateInput('paymentFeePercent', v)}
                unit="%"
                step={0.1}
              />
              <InputNumber
                id="sp_paymentFixed"
                label="رسم العملية الثابت"
                value={inputs.paymentFeeFixed}
                onChange={(v) => updateInput('paymentFeeFixed', v)}
                unit={currency}
                step={0.5}
              />
            </div>
          </div>

          {/* النتائج */}
          <div className="lg:col-span-5 bg-[#FAF8FF]/40 p-5 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-2">
                <h3 className="text-sm font-bold text-[#141D30] uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#4B6AD9]" />
                  <span>السعر الموصى به</span>
                </h3>
              </div>

              {!result.isValid ? (
                <div className="p-4 rounded-2xl bg-[#FF7373]/15 border border-[#FF7373]/40 text-rose-900 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-[#FF7373]" />
                  <span>{result.errorMessage}</span>
                </div>
              ) : (
                <>
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-[#4B6AD9] to-[#26395E] text-white shadow-md">
                    <span className="text-xs font-medium text-[#B2CBF4] uppercase tracking-wider block">
                      سعر البيع النهائي المقترح
                    </span>
                    <span className="text-3xl md:text-4xl font-extrabold font-mono tracking-tight mt-1 block">
                      {formatCurrency(result.targetSellingPrice, currency)}
                    </span>
                    <span className="text-xs text-[#B2CBF4] mt-2 block border-t border-white/20 pt-2">
                      يحقق لك صافي ربح قدره {formatCurrency(result.expectedNetProfit, currency)} لكل طلب
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <ResultStat
                      label="صافي الربح المتوقع"
                      value={formatCurrency(result.expectedNetProfit, currency)}
                      subValue={`هامش صافي ${formatPercent(result.effectiveMarginPercent)}`}
                      size="sm"
                    />

                    <ResultStat
                      label="نسبة المارك أب (Markup)"
                      value={formatPercent(result.markupPercent)}
                      subValue="الزيادة المضافة فوق التكلفة"
                      size="sm"
                      badge="Markup"
                      badgeVariant="info"
                    />

                    <ResultStat
                      label="إجمالي التكاليف المتوقعة"
                      value={formatCurrency(result.totalCosts, currency)}
                      subValue="شاملة البضاعة والشحن والدفع"
                      size="sm"
                    />

                    <ResultStat
                      label="رسوم الدفع المقدرة"
                      value={formatCurrency(result.paymentFee, currency)}
                      subValue="عند هذا السعر"
                      size="sm"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-[#141D30] text-[#B2CBF4] border border-[#26395E] text-xs leading-relaxed">
              💡 <strong className="text-white">نصيحة تسعير:</strong>{' '}
              {result.isValid && result.targetSellingPrice >= 5 ? (
                <>
                  يمكنك تعديل السعر النهائي إلى أقرب رقم نفسي جذاب للعميل، مثل تسعير{' '}
                  <strong className="text-white">{formatCurrency(result.targetSellingPrice, currency)}</strong> إلى{' '}
                  <strong className="text-white">
                    {Math.max(1, Math.ceil(result.targetSellingPrice / 5) * 5 - 1)} {currency}
                  </strong>{' '}
                  (مثال: 99 أو 149 ر.س).
                </>
              ) : (
                <>تأكد من إدخال كافة التكاليف بدقة وتحديد هامش ربح واقعي للحصول على أفضل سعر مقترح لمتجرك.</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
