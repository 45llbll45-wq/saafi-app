'use client';

import React, { useState, useEffect } from 'react';
import { ProfitCalculatorInputs } from '@/lib/types';
import { calculateProfit } from '@/lib/calculations';
import { InputNumber } from '@/components/ui/InputNumber';
import { ResultStat } from '@/components/ui/ResultStat';
import { CostBreakdownChart } from './CostBreakdownChart';
import { DiscountSimulator } from './DiscountSimulator';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { copyToClipboard } from '@/lib/clipboard';
import {
  RotateCcw,
  Copy,
  Check,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Percent,
  CreditCard,
  Megaphone,
} from 'lucide-react';

const DEFAULT_INPUTS: ProfitCalculatorInputs = {
  sellingPrice: 100,
  productCost: 35,
  shippingCost: 10,
  paymentFeePercent: 2.5,
  paymentFeeFixed: 1.0,
  marketingCost: 10,
  discountPercent: 0,
};

const STORAGE_KEY = 'saafi_profit_calculator_inputs';

export const ProfitCalculator: React.FC<{ initialInputs?: Partial<ProfitCalculatorInputs> }> = ({
  initialInputs,
}) => {
  const [inputs, setInputs] = useState<ProfitCalculatorInputs>(() => ({
    ...DEFAULT_INPUTS,
    ...initialInputs,
  }));
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState('ر.س');

  // استرجاع آخر عملية من localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setInputs((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

  // حفظ التعديلات في localStorage
  const updateInput = (key: keyof ProfitCalculatorInputs, value: number) => {
    setInputs((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const result = calculateProfit(inputs);

  // نسخ ملخص التحليل المالي
  const handleCopySummary = async () => {
    const text = `📊 ملخص تحليل الربحية من صافي (Saafi.app):
━━━━━━━━━━━━━━━━━━━━
• سعر البيع الأصلي: ${formatCurrency(result.originalPrice, currency)}
• الخصم (${result.discountPercent}%): -${formatCurrency(result.discountAmount, currency)}
• السعر الفعلي بعد الخصم: ${formatCurrency(result.netSellingPrice, currency)}
━━━━━━━━━━━━━━━━━━━━
• تكلفة المنتج: ${formatCurrency(result.productCost, currency)} (${formatPercent(result.productCostPercent)})
• تكلفة الشحن: ${formatCurrency(result.shippingCost, currency)} (${formatPercent(result.shippingCostPercent)})
• التسويق لكل طلب: ${formatCurrency(result.marketingCost, currency)} (${formatPercent(result.marketingCostPercent)})
• رسوم بوابة الدفع: ${formatCurrency(result.paymentFee, currency)} (${formatPercent(result.paymentFeePercentOfPrice)})
• إجمالي التكاليف: ${formatCurrency(result.totalCosts, currency)}
━━━━━━━━━━━━━━━━━━━━
💰 صافي الربح: ${formatCurrency(result.netProfit, currency)}
📈 هامش الربح الصافي: ${formatPercent(result.netMarginPercent)}
🎯 سعر التعادل الأدنى: ${formatCurrency(result.breakEvenPrice, currency)}
━━━━━━━━━━━━━━━━━━━━
احسب أرباح متجرك مجانًا على: https://saafi.app`;

    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // إعدادات مسبقة لبوابات الدفع الشهيرة في السعودية
  const applyGatewayPreset = (percent: number, fixed: number) => {
    setInputs((prev) => ({
      ...prev,
      paymentFeePercent: percent,
      paymentFeeFixed: fixed,
    }));
  };

  return (
    <div className="w-full space-y-6">
      {/* البطاقة الرئيسية للحاسبة */}
      <div className="bg-white rounded-3xl border border-[#D9D9D9] shadow-soft overflow-hidden">
        {/* رأس الحاسبة والتحكم */}
        <div className="bg-[#141D30] text-white p-5 md:px-8 md:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4B6AD9]/20 text-[#B2CBF4] border border-[#4B6AD9]/30 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-[#B2CBF4]" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold">حاسبة صافي الأرباح المباشرة</h2>
              <p className="text-xs text-[#B0B0B0]">
                تحديث لحظي لجميع النتائج بمجرد تعديل أي رقم
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#26395E] hover:bg-[#26395E]/80 text-[#FAF8FF] text-xs font-semibold border border-[#4B6AD9]/40 transition-colors"
              title="نسخ ملخص النتيجة"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ بنجاح!' : 'نسخ النتيجة'}</span>
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

        {/* جسم الحاسبة: المدخلات والنتائج */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-[#D9D9D9]">
          {/* قسم المدخلات (7 أعمدة على الشاشات الكبيرة) */}
          <div className="lg:col-span-7 p-5 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#141D30] uppercase tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4B6AD9]"></span>
                مدخلات التكاليف وسعر البيع
              </h3>
              <span className="text-xs text-slate-400">العملة: {currency}</span>
            </div>

            {/* الحقول الأساسية */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputNumber
                id="sellingPrice"
                label="1. سعر بيع المنتج"
                value={inputs.sellingPrice}
                onChange={(val) => updateInput('sellingPrice', val)}
                unit={currency}
                placeholder="100.00"
                helpText="السعر الذي يدفعه العميل في المتجر قبل الخصم."
                required
              />

              <InputNumber
                id="productCost"
                label="2. تكلفة المنتج (شراء وتوريد)"
                value={inputs.productCost}
                onChange={(val) => updateInput('productCost', val)}
                unit={currency}
                placeholder="35.00"
                helpText="سعر شراء القطعة من المورد شاملاً الجمارك والشحن للمستودع (COGS)."
                required
              />

              <InputNumber
                id="shippingCost"
                label="3. تكلفة الشحن والتوصيل"
                value={inputs.shippingCost}
                onChange={(val) => updateInput('shippingCost', val)}
                unit={currency}
                placeholder="10.00"
                helpText="تكلفة بوليصة الشحن والتغليف للطلب الواحد."
              />

              <InputNumber
                id="marketingCost"
                label="4. تكلفة التسويق لكل طلب (CPA)"
                value={inputs.marketingCost}
                onChange={(val) => updateInput('marketingCost', val)}
                unit={currency}
                placeholder="10.00"
                helpText="متوسط ما تنفقه في الإعلانات للحصول على طلب واحد ناجح."
              />
            </div>

            {/* رسوم بوابة الدفع مع أزرار سريعة */}
            <div className="p-4 rounded-2xl bg-[#FAF8FF] border border-[#B2CBF4]/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs font-bold text-[#141D30] flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#4B6AD9]" />
                  <span>رسوم بوابة الدفع الإلكتروني</span>
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-slate-400">تجهيز سريع:</span>
                  <button
                    type="button"
                    onClick={() => applyGatewayPreset(1.75, 1.0)}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-white hover:bg-[#FAF8FF] text-[#141D30] border border-[#D9D9D9] font-medium transition-colors"
                  >
                    مدى (1.75% + 1)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyGatewayPreset(2.5, 1.0)}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-white hover:bg-[#FAF8FF] text-[#141D30] border border-[#D9D9D9] font-medium transition-colors"
                  >
                    فيزا (2.5% + 1)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyGatewayPreset(6.0, 1.5)}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-white hover:bg-[#FAF8FF] text-[#141D30] border border-[#D9D9D9] font-medium transition-colors"
                  >
                    تابي/تمارا (6% + 1.5)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputNumber
                  id="paymentFeePercent"
                  label="5. نسبة بوابة الدفع"
                  value={inputs.paymentFeePercent}
                  onChange={(val) => updateInput('paymentFeePercent', val)}
                  unit="%"
                  placeholder="2.5"
                  step={0.1}
                  helpText="النسبة المئوية التي تخصمها بوابة الدفع من إجمالي قيمة العملية."
                />
                <InputNumber
                  id="paymentFeeFixed"
                  label="6. رسوم ثابتة للعملية"
                  value={inputs.paymentFeeFixed}
                  onChange={(val) => updateInput('paymentFeeFixed', val)}
                  unit={currency}
                  placeholder="1.00"
                  step={0.5}
                  helpText="الرسم الثابت المقطوع لكل عملية (مثال 1 ريال أو 1.5 ريال)."
                />
              </div>
            </div>

            {/* الخصم والعروض */}
            <div className="p-4 rounded-2xl bg-[#DED1FF]/20 border border-[#DED1FF] space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="discountPercent"
                  className="text-xs font-bold text-[#141D30] flex items-center gap-1.5"
                >
                  <Percent className="w-3.5 h-3.5 text-[#4B6AD9]" />
                  <span>7. نسبة الخصم الممنوحة للعميل</span>
                </label>
                <span className="text-xs font-bold text-[#4B6AD9]">
                  {inputs.discountPercent}%
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="range"
                  id="discountRange"
                  min="0"
                  max="50"
                  step="5"
                  value={inputs.discountPercent}
                  onChange={(e) => updateInput('discountPercent', parseFloat(e.target.value))}
                  className="w-full accent-[#4B6AD9] cursor-pointer h-2 bg-[#B2CBF4]/50 rounded-lg"
                />
                <div className="w-24 shrink-0">
                  <InputNumber
                    id="discountPercent"
                    label=""
                    value={inputs.discountPercent}
                    onChange={(val) => updateInput('discountPercent', val)}
                    unit="%"
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {[0, 5, 10, 15, 20, 25, 30].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => updateInput('discountPercent', pct)}
                    className={`text-xs px-2.5 py-1 rounded-xl font-semibold transition-all ${
                      inputs.discountPercent === pct
                        ? 'bg-[#4B6AD9] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-[#D9D9D9] hover:bg-[#FAF8FF]'
                    }`}
                  >
                    {pct === 0 ? 'بدون خصم' : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* قسم النتائج المالية (5 أعمدة على الشاشات الكبيرة) */}
          <div className="lg:col-span-5 bg-[#FAF8FF]/40 p-5 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-3">
                <h3 className="text-sm font-bold text-[#141D30] uppercase tracking-wide flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#4B6AD9]" />
                  <span>النتائج والتحليل المالي</span>
                </h3>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    result.statusVariant === 'success'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : result.statusVariant === 'warning'
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : 'bg-[#FF7373]/15 text-[#FF7373] border-[#FF7373]/40'
                  }`}
                >
                  {result.statusText}
                </span>
              </div>

              {/* البطاقة الرئيسية للربح الصافي */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  result.netProfit > 0
                    ? 'bg-gradient-to-br from-[#FAF8FF] to-[#DED1FF]/30 border-[#B2CBF4] text-[#141D30] shadow-xs'
                    : result.netProfit === 0
                    ? 'bg-slate-100 border-[#D9D9D9] text-[#141D30]'
                    : 'bg-gradient-to-br from-[#FF7373]/10 to-rose-50 border-[#FF7373]/50 text-rose-950 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    صافي الربح للطلب
                  </span>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-lg bg-white/90 border border-[#D9D9D9] text-[#4B6AD9]">
                    هامش الربح: {formatPercent(result.netMarginPercent)}
                  </span>
                </div>

                <div className="mt-2 flex items-baseline justify-between">
                  <span className={`text-3xl md:text-4xl font-extrabold font-mono tracking-tight ${result.netProfit > 0 ? 'text-[#4B6AD9]' : result.netProfit < 0 ? 'text-[#FF7373]' : 'text-[#141D30]'}`}>
                    {formatCurrency(result.netProfit, currency)}
                  </span>
                </div>

                {result.discountAmount > 0 && (
                  <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-200/60">
                    السعر بعد خصم {result.discountPercent}% هو{' '}
                    <strong>{formatCurrency(result.netSellingPrice, currency)}</strong> (وفرت للعميل{' '}
                    {formatCurrency(result.discountAmount, currency)})
                  </p>
                )}
              </div>

              {/* شبكة الإحصائيات الفرعية */}
              <div className="grid grid-cols-2 gap-3">
                <ResultStat
                  label="إجمالي التكاليف"
                  value={formatCurrency(result.totalCosts, currency)}
                  subValue={`تشكل ${formatPercent(result.netSellingPrice > 0 ? (result.totalCosts / result.netSellingPrice) * 100 : 0)} من السعر`}
                  size="sm"
                />

                <ResultStat
                  label="سعر التعادل (الحد الأدنى)"
                  value={formatCurrency(result.breakEvenPrice, currency)}
                  subValue="أقل سعر للبيع دون خسارة"
                  size="sm"
                  badge="Break-Even"
                  badgeVariant="info"
                />

                <ResultStat
                  label="تكلفة المنتج من السعر"
                  value={formatPercent(result.productCostPercent)}
                  subValue={formatCurrency(result.productCost, currency)}
                  size="sm"
                />

                <ResultStat
                  label="رسوم بوابة الدفع"
                  value={formatCurrency(result.paymentFee, currency)}
                  subValue={formatPercent(result.paymentFeePercentOfPrice)}
                  size="sm"
                />
              </div>

              {/* بطاقة تكلفة التسويق */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#D9D9D9] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#4B6AD9]" />
                  <span className="font-semibold text-[#141D30]">التسويق لكل طلب (CPA):</span>
                </div>
                <div className="font-mono font-bold text-[#141D30]">
                  {formatCurrency(result.marketingCost, currency)}{' '}
                  <span className="text-slate-400 font-normal">
                    ({formatPercent(result.marketingCostPercent)})
                  </span>
                </div>
              </div>
            </div>

            {/* تنبيه ذكي مالي ديناميكي يتغير لونه حسب حالة الربح والخسارة */}
            <div
              className={`p-3.5 rounded-2xl text-xs flex items-start gap-2.5 transition-colors duration-300 border ${
                result.netProfit < 0
                  ? 'bg-rose-950 text-rose-100 border-rose-800 shadow-md'
                  : result.netMarginPercent < 15
                  ? 'bg-amber-950 text-amber-100 border-amber-800 shadow-md'
                  : 'bg-[#141D30] text-[#FAF8FF] border-[#26395E] shadow-md'
              }`}
            >
              {result.netProfit < 0 ? (
                <AlertCircle className="w-4 h-4 text-[#FF7373] shrink-0 mt-0.5 animate-pulse" />
              ) : result.netMarginPercent < 15 ? (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <Sparkles className="w-4 h-4 text-[#B2CBF4] shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <span className="font-bold text-white">نصيحة صافي المالية:</span>
                <p
                  className={`leading-relaxed ${
                    result.netProfit < 0
                      ? 'text-rose-200'
                      : result.netMarginPercent < 15
                      ? 'text-amber-200'
                      : 'text-[#B2CBF4]'
                  }`}
                >
                  {result.netProfit < 0
                    ? 'أنت تبيع بخسارة! يجب عليك رفع سعر البيع أو التفاوض لتخفيض تكلفة المنتج والشحن فوراً.'
                    : result.netMarginPercent < 15
                    ? 'هامش الربح ضيق جداً (أقل من 15%)، أي زيادة في تكلفة الإعلانات أو الشحن قد تحولك للخسارة.'
                    : result.netMarginPercent >= 30
                    ? 'هامش ربحك قوي جداً وممتاز، ويسمح لك برفع ميزانية الإعلانات للتوسع وضخ المزيد من المبيعات.'
                    : 'هامش ربحك جيد وفي النطاق الآمن، احرص على مراقبة تكلفة الإعلانات وعدم المبالغة في الخصومات.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* شريط توزيع التكاليف والأرباح */}
      <CostBreakdownChart result={result} currency={currency} />

      {/* محاكي الخصومات التفاعلي */}
      <DiscountSimulator
        inputs={inputs}
        onSelectDiscount={(discount) => updateInput('discountPercent', discount)}
        currency={currency}
      />
    </div>
  );
};
