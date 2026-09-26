'use client';

import React, { useState } from 'react';
import { MarketingRoiInputs } from '@/lib/types';
import { calculateMarketingRoi } from '@/lib/calculations';
import { InputNumber } from '@/components/ui/InputNumber';
import { ResultStat } from '@/components/ui/ResultStat';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatters';
import { copyToClipboard } from '@/lib/clipboard';
import { TrendingUp, Sparkles, Check, Copy, AlertTriangle, Megaphone, RotateCcw } from 'lucide-react';

const DEFAULT_MARKETING_INPUTS: MarketingRoiInputs = {
  adSpend: 3000,
  totalRevenue: 12000,
  totalOrders: 80,
  averageProductCost: 45,
  averageShippingCost: 15,
  paymentFeePercent: 2.5,
};

export const MarketingRoiCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<MarketingRoiInputs>(DEFAULT_MARKETING_INPUTS);
  const [copied, setCopied] = useState(false);
  const currency = 'ر.س';

  const updateInput = (key: keyof MarketingRoiInputs, val: number) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_MARKETING_INPUTS);
  };

  const result = calculateMarketingRoi(inputs);

  const handleCopy = async () => {
    const text = `📈 نتيجة تحليل عائد الإعلانات (ROAS) من صافي:
عائد الإنفاق الإعلاني (ROAS): ${result.roas}x
تكلفة الاستحواذ على الطلب (CPA): ${formatCurrency(result.cpa, currency)}
متوسط قيمة السلة (AOV): ${formatCurrency(result.aov, currency)}
صافي الربح الفعلي للحملة: ${formatCurrency(result.netProfit, currency)}
عائد الاستثمار الصافي (Net ROI): ${formatPercent(result.netRoiPercent)}
الحد الأدنى لـ ROAS للتعادل: ${result.breakEvenRoas}x
احسب عائد إعلاناتك: https://saafi.app/marketing-roi-calculator`;
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
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold">حاسبة عائد الإعلانات و ROAS</h2>
              <p className="text-xs text-[#B0B0B0]">
                احسب ROAS و CPA الحقيقي وصافي الربح بعد خصم البضاعة والشحن والدفع
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
              بيانات الحملة الإعلانية والتكاليف
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputNumber
                id="mkt_adSpend"
                label="إجمالي الإنفاق الإعلاني (Ad Spend)"
                value={inputs.adSpend}
                onChange={(v) => updateInput('adSpend', v)}
                unit={currency}
                helpText="الميزانية المصروفة على ميتا، تيك توك، سناب شات، أو جوجل."
                required
              />

              <InputNumber
                id="mkt_totalRevenue"
                label="إجمالي الإيرادات الناتجة (Revenue)"
                value={inputs.totalRevenue}
                onChange={(v) => updateInput('totalRevenue', v)}
                unit={currency}
                helpText="قيمة المبيعات الإجمالية المحققة من هذه الحملة."
                required
              />

              <InputNumber
                id="mkt_totalOrders"
                label="إجمالي عدد الطلبات المحققة"
                value={inputs.totalOrders}
                onChange={(v) => updateInput('totalOrders', v)}
                unit="طلب"
                min={1}
                required
              />

              <InputNumber
                id="mkt_avgProductCost"
                label="متوسط تكلفة البضاعة للطلب (COGS)"
                value={inputs.averageProductCost}
                onChange={(v) => updateInput('averageProductCost', v)}
                unit={currency}
                required
              />

              <InputNumber
                id="mkt_avgShippingCost"
                label="متوسط تكلفة الشحن والتغليف للطلب"
                value={inputs.averageShippingCost}
                onChange={(v) => updateInput('averageShippingCost', v)}
                unit={currency}
              />

              <InputNumber
                id="mkt_paymentPercent"
                label="نسبة رسوم بوابة الدفع"
                value={inputs.paymentFeePercent}
                onChange={(v) => updateInput('paymentFeePercent', v)}
                unit="%"
                step={0.1}
              />
            </div>
          </div>

          {/* النتائج */}
          <div className="lg:col-span-5 bg-[#FAF8FF]/60 p-5 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-2">
                <h3 className="text-sm font-bold text-[#141D30] uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#4B6AD9]" />
                  <span>مؤشرات أداء الإعلانات</span>
                </h3>
              </div>

              {/* بطاقة ROAS و CPA الرئيسية */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#141D30] to-[#26395E] text-white shadow-md border border-[#26395E] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#B2CBF4] uppercase tracking-wider">
                    عائد الإنفاق الإعلاني (ROAS)
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                    result.isProfitable
                      ? 'bg-[#4B6AD9]/30 border-[#B2CBF4]/40 text-[#B2CBF4]'
                      : 'bg-rose-500/20 border-[#FF7373] text-[#FF7373]'
                  }`}>
                    {result.isProfitable ? 'حملة رابحة' : 'حملة خاسرة'}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-5xl font-extrabold font-mono text-white">
                    {result.roas}x
                  </span>
                  <span className="text-xs text-[#B2CBF4]">
                    (كل 1 ريال يولد {result.roas} ريال مبيعات)
                  </span>
                </div>

                <div className="pt-2 border-t border-[#26395E] flex items-center justify-between text-xs text-[#B2CBF4]">
                  <span>تكلفة الطلب (CPA): <strong>{formatCurrency(result.cpa, currency)}</strong></span>
                  <span>متوسط السلة (AOV): <strong>{formatCurrency(result.aov, currency)}</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ResultStat
                  label="صافي الربح الفعلي للحملة"
                  value={formatCurrency(result.netProfit, currency)}
                  subValue={`عائد ${formatPercent(result.netRoiPercent)} على الإعلان`}
                  highlight
                  highlightVariant={result.isProfitable ? 'success' : 'danger'}
                  size="sm"
                />

                <ResultStat
                  label="Break-Even ROAS"
                  value={result.breakEvenRoas > 0 ? `${result.breakEvenRoas}x` : 'غير ممكن'}
                  subValue={result.breakEvenRoas > 0 ? 'أقل عائد لتفادي الخسارة' : 'التكاليف تتجاوز الإيراد'}
                  size="sm"
                  badge="نقطة التعادل"
                  badgeVariant={result.breakEvenRoas > 0 ? 'warning' : 'danger'}
                />

                <ResultStat
                  label="إجمالي تكلفة البضاعة"
                  value={formatCurrency(result.totalCOGS, currency)}
                  subValue={`لـ ${inputs.totalOrders} طلب`}
                  size="sm"
                />

                <ResultStat
                  label="إجمالي تكلفة الشحن والدفع"
                  value={formatCurrency(result.totalShipping + result.totalPaymentFees, currency)}
                  subValue="رسوم تشغيلية"
                  size="sm"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8FF] border border-[#B2CBF4] text-[#141D30] text-xs leading-relaxed">
              {result.breakEvenRoas > 0 ? (
                <>
                  💡 <strong>معلومة ذهبية:</strong> طالما أن الـ ROAS المحقق (<strong className="text-[#4B6AD9]">{result.roas}x</strong>) أعلى من الـ Break-Even ROAS (<strong className="text-[#4B6AD9]">{result.breakEvenRoas}x</strong>)، فأنت تحقق أرباحًا حقيقية ويمكنك زيادة ميزانية الحملة تدريجيًا.
                </>
              ) : (
                <>
                  ⚠️ <strong>تنبيه الإعلانات:</strong> تكاليف البضاعة والشحن ورسوم الدفع مرتفعة جداً نسبة للإيرادات، مما يجعل تحقيق التعادل عبر الإعلانات غير ممكن قبل زيادة هوامش التسعير.
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
