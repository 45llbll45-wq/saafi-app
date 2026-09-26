export const SITE_CONFIG = {
  name: 'صافي | Saafi',
  shortName: 'صافي',
  domain: 'https://saafi.app', // الدومين الأساسي للموقع
  title: 'صافي | حاسبة أرباح التجارة الإلكترونية',
  tagline: 'حاسبة أرباح التجارة الإلكترونية',
  description:
    'أداة عربية مجانية ودقيقة تساعد أصحاب المتاجر الإلكترونية على حساب صافي الربح الحقيقي، تسعير المنتجات، نقطة التعادل، ومحاكاة تأثير الخصومات والتسويق.',
  keywords: [
    'صافي',
    'Saafi',
    'حاسبة أرباح التجارة الإلكترونية',
    'حساب صافي الربح',
    'هامش الربح',
    'نقطة التعادل للمتجر الإلكتروني',
    'تسعير المنتجات',
    'حساب تكلفة الشحن والإعلانات',
    'رسوم بوابة الدفع',
    'أدوات سلة وزد وشوبيفاي',
    'صافي أرباح المتجر',
    'عائد الإعلانات ROAS',
  ],
  author: 'صافي | Saafi - حاسبة أرباح التجارة الإلكترونية',
  locale: 'ar_SA',
  themeColor: '#4B6AD9',
  contactEmail: 'contact@saafi.app',
};

export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.domain}${cleanPath}`;
}
