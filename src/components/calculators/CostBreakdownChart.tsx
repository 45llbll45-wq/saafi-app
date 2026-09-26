import React from 'react';
import { ProfitCalculationResult } from '@/lib/types';
import { formatPercent, formatCurrency } from '@/lib/formatters';

interface CostBreakdownChartProps {
  result: ProfitCalculationResult;
  currency?: string;
}

export const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({
  result,
  currency = 'ر.س',
}) => {
  const {
    netSellingPrice,
    productCost,
    shippingCost,
    marketingCost,
    paymentFee,
    netProfit,
  } = result;

  if (netSellingPrice <= 0) return null;

  // حساب النسب المئوية بالنسبة للسعر الفعلي
  const productPct = Math.max(0, (productCost / netSellingPrice) * 100);
  const shippingPct = Math.max(0, (shippingCost / netSellingPrice) * 100);
  const marketingPct = Math.max(0, (marketingCost / netSellingPrice) * 100);
  const paymentPct = Math.max(0, (paymentFee / netSellingPrice) * 100);
  const profitPct = Math.max(0, (netProfit / netSellingPrice) * 100);

  const items = [
    {
      label: 'تكلفة المنتج',
      amount: productCost,
      pct: productPct,
      color: 'bg-[#26395E]',
      textColor: 'text-[#26395E]',
      dotColor: 'bg-[#26395E]',
    },
    {
      label: 'الشحن والتوصيل',
      amount: shippingCost,
      pct: shippingPct,
      color: 'bg-[#B2CBF4]',
      textColor: 'text-[#4B6AD9]',
      dotColor: 'bg-[#B2CBF4]',
    },
    {
      label: 'التسويق والإعلانات',
      amount: marketingCost,
      pct: marketingPct,
      color: 'bg-[#DED1FF]',
      textColor: 'text-[#4B6AD9]',
      dotColor: 'bg-[#DED1FF]',
    },
    {
      label: 'رسوم بوابة الدفع',
      amount: paymentFee,
      pct: paymentPct,
      color: 'bg-[#B0B0B0]',
      textColor: 'text-slate-600',
      dotColor: 'bg-[#B0B0B0]',
    },
    {
      label: netProfit >= 0 ? 'صافي الربح' : 'عجز / خسارة',
      amount: Math.abs(netProfit),
      pct: profitPct,
      color: netProfit >= 0 ? 'bg-[#4B6AD9]' : 'bg-[#FF7373]',
      textColor: netProfit >= 0 ? 'text-[#4B6AD9] font-bold' : 'text-[#FF7373] font-bold',
      dotColor: netProfit >= 0 ? 'bg-[#4B6AD9]' : 'bg-[#FF7373]',
    },
  ];

  return (
    <div className="w-full bg-[#FAF8FF] rounded-2xl p-4 border border-[#D9D9D9]">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-bold text-[#141D30] uppercase tracking-wide">
          توزيع سعر البيع الفعلي ({formatCurrency(netSellingPrice, currency)})
        </h4>
        <span className="text-[11px] text-slate-500 font-medium">نسب مئوية</span>
      </div>

      {/* الشريط البصري الملون */}
      <div className="w-full h-4 rounded-full overflow-hidden flex bg-[#D9D9D9]/50 shadow-inner">
        {productPct > 0 && (
          <div
            style={{ width: `${productPct}%` }}
            className="bg-[#26395E] transition-all duration-300 relative group"
            title={`تكلفة المنتج: ${formatPercent(productPct)}`}
          />
        )}
        {shippingPct > 0 && (
          <div
            style={{ width: `${shippingPct}%` }}
            className="bg-[#B2CBF4] transition-all duration-300 relative group"
            title={`الشحن: ${formatPercent(shippingPct)}`}
          />
        )}
        {marketingPct > 0 && (
          <div
            style={{ width: `${marketingPct}%` }}
            className="bg-[#DED1FF] transition-all duration-300 relative group"
            title={`التسويق: ${formatPercent(marketingPct)}`}
          />
        )}
        {paymentPct > 0 && (
          <div
            style={{ width: `${paymentPct}%` }}
            className="bg-[#B0B0B0] transition-all duration-300 relative group"
            title={`رسوم الدفع: ${formatPercent(paymentPct)}`}
          />
        )}
        {netProfit > 0 && (
          <div
            style={{ width: `${profitPct}%` }}
            className="bg-[#4B6AD9] transition-all duration-300 relative group"
            title={`صافي الربح: ${formatPercent(profitPct)}`}
          />
        )}
      </div>

      {/* وسيلة الإيضاح (Legend) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-3 text-xs">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.dotColor}`} />
            <span className="text-slate-600 truncate">{item.label}:</span>
            <span className={`font-mono font-medium ${item.textColor}`}>
              {formatPercent(item.pct)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
