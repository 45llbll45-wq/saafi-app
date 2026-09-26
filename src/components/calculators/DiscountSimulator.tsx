'use client';

import React from 'react';
import { ProfitCalculatorInputs } from '@/lib/types';
import { simulateDiscounts } from '@/lib/calculations';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface DiscountSimulatorProps {
  inputs: ProfitCalculatorInputs;
  onSelectDiscount?: (discountPercent: number) => void;
  currency?: string;
}

export const DiscountSimulator: React.FC<DiscountSimulatorProps> = ({
  inputs,
  onSelectDiscount,
  currency = 'ر.س',
}) => {
  const steps = [0, 5, 10, 15, 20, 25, 30];
  const results = simulateDiscounts(inputs, steps);

  return (
    <div className="bg-white rounded-3xl p-5 md:p-6 border border-[#D9D9D9] shadow-soft space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-[#141D30] flex items-center gap-2">
            <span>محاكي الخصم والعروض الترويجية</span>
            <span className="text-xs font-semibold text-[#4B6AD9] bg-[#FAF8FF] px-2.5 py-0.5 rounded-full border border-[#B2CBF4]">
              تفاعلي
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            شاهد كيف يتغير صافي ربحك وهامشك مباشرة عند تقديم نسب خصم مختلفة
          </p>
        </div>
      </div>

      {/* جدول محاكاة الخصم المتجاوب */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs md:text-sm">
          <thead>
            <tr className="border-b border-[#D9D9D9] bg-[#FAF8FF] text-[#141D30] font-semibold">
              <th className="py-2.5 px-3 rounded-r-xl">نسبة الخصم</th>
              <th className="py-2.5 px-3">سعر البيع بعد الخصم</th>
              <th className="py-2.5 px-3">صافي الربح</th>
              <th className="py-2.5 px-3">هامش الربح</th>
              <th className="py-2.5 px-3">فارق الربح</th>
              <th className="py-2.5 px-3 rounded-l-xl text-center">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((item) => {
              const isCurrent = inputs.discountPercent === item.discountPercent;
              const isProfitable = item.netProfit > 0;
              const isWarning = isProfitable && item.netMarginPercent < 15;

              return (
                <tr
                  key={item.discountPercent}
                  onClick={() => onSelectDiscount && onSelectDiscount(item.discountPercent)}
                  className={`cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-[#FAF8FF] font-bold text-[#141D30] ring-1 ring-[#4B6AD9]/40'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-lg text-xs font-bold ${
                          item.discountPercent === 0
                            ? 'bg-slate-200 text-[#141D30]'
                            : 'bg-[#B2CBF4]/40 text-[#141D30]'
                        }`}
                      >
                        {item.discountPercent}%
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] text-[#4B6AD9] bg-[#DED1FF]/60 px-1.5 py-0.2 rounded font-medium">
                          المحدد حاليًا
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono font-medium">
                    {formatCurrency(item.netSellingPrice, currency)}
                  </td>
                  <td
                    className={`py-3 px-3 font-mono font-bold ${
                      item.netProfit > 0
                        ? 'text-emerald-600'
                        : item.netProfit === 0
                        ? 'text-slate-500'
                        : 'text-[#FF7373]'
                    }`}
                  >
                    {formatCurrency(item.netProfit, currency)}
                  </td>
                  <td className="py-3 px-3 font-mono font-medium">
                    {formatPercent(item.netMarginPercent)}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {item.discountPercent === 0 ? (
                      '—'
                    ) : (
                      <span className="text-[#FF7373] font-medium">
                        {formatCurrency(item.differenceFromOriginalProfit, currency)}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {!isProfitable ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FF7373] bg-[#FF7373]/15 px-2 py-0.5 rounded-full border border-[#FF7373]/40">
                        <XCircle className="w-3 h-3" /> خسارة
                      </span>
                    ) : isWarning ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <AlertTriangle className="w-3 h-3" /> هامش ضيق
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> رابح
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-slate-400">
        💡 اضغط على أي صف لتطبيق نسبة الخصم تلقائيًا في الحاسبة بالأعلى.
      </p>
    </div>
  );
};
