/**
 * تنسيق المبالغ المالية مع رمز العملة
 */
export function formatCurrency(
  amount: number,
  currency: string = 'ر.س',
  locale: string = 'ar-SA'
): string {
  if (isNaN(amount) || amount === null || amount === undefined) return `0.00 ${currency}`;
  const formatted = Math.abs(amount).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return amount < 0 ? `-${formatted} ${currency}` : `${formatted} ${currency}`;
}

/**
 * تنسيق النسب المئوية
 */
export function formatPercent(
  percent: number,
  locale: string = 'ar-SA',
  includeSign: boolean = false
): string {
  if (isNaN(percent) || percent === null || percent === undefined) return '0.0%';
  const sign = includeSign && percent > 0 ? '+' : '';
  return `${sign}${percent.toFixed(1)}%`;
}

/**
 * تنسيق الأرقام مع فواصل الآلاف
 */
export function formatNumber(
  num: number,
  locale: string = 'ar-SA',
  maximumFractionDigits: number = 2
): string {
  if (isNaN(num) || num === null || num === undefined) return '0';
  return num.toLocaleString(locale, { maximumFractionDigits });
}

/**
 * العملات المدعومة في صافي مع رموزها
 */
export const SUPPORTED_CURRENCIES = [
  { code: 'SAR', symbol: 'ر.س', name: 'ريال سعودي' },
  { code: 'AED', symbol: 'د.إ', name: 'درهم إماراتي' },
  { code: 'KWD', symbol: 'د.ك', name: 'دينار كويتي' },
  { code: 'QAR', symbol: 'ر.ق', name: 'ريال قطري' },
  { code: 'OMR', symbol: 'ر.ع', name: 'ريال عماني' },
  { code: 'BHD', symbol: 'د.ب', name: 'دينار بحريني' },
  { code: 'EGP', symbol: 'ج.م', name: 'جنيه مصري' },
  { code: 'USD', symbol: '$', name: 'دولار أمريكي' },
];
