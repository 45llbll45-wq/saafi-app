export interface ProfitCalculatorInputs {
  sellingPrice: number; // سعر البيع الأصلي
  productCost: number; // تكلفة المنتج
  shippingCost: number; // تكلفة الشحن
  paymentFeePercent: number; // نسبة بوابة الدفع %
  paymentFeeFixed: number; // رسوم ثابتة لبوابة الدفع (ر.س)
  marketingCost: number; // تكلفة التسويق لكل طلب
  discountPercent: number; // نسبة الخصم %
  currency?: string; // العملة
}

export interface ProfitCalculationResult {
  originalPrice: number;
  discountPercent: number;
  discountAmount: number;
  netSellingPrice: number; // السعر بعد الخصم
  productCost: number;
  shippingCost: number;
  marketingCost: number;
  paymentFee: number;
  totalCosts: number;
  netProfit: number;
  netMarginPercent: number; // هامش صافي الربح %
  productCostPercent: number; // نسبة تكلفة المنتج من السعر
  marketingCostPercent: number; // نسبة تكلفة التسويق من السعر
  shippingCostPercent: number; // نسبة الشحن من السعر
  paymentFeePercentOfPrice: number; // نسبة رسوم الدفع من السعر
  breakEvenPrice: number; // سعر التعادل للوحدة
  isProfitable: boolean;
  statusText: string;
  statusVariant: 'success' | 'warning' | 'danger';
}

export interface DiscountSimulationItem {
  discountPercent: number;
  netSellingPrice: number;
  paymentFee: number;
  totalCosts: number;
  netProfit: number;
  netMarginPercent: number;
  isProfitable: boolean;
  differenceFromOriginalProfit: number;
}

export interface SellingPriceInputs {
  productCost: number;
  shippingCost: number;
  marketingCost: number;
  paymentFeePercent: number;
  paymentFeeFixed: number;
  targetMarginPercent: number; // هامش الربح المستهدف %
}

export interface SellingPriceResult {
  targetSellingPrice: number;
  paymentFee: number;
  totalCosts: number;
  expectedNetProfit: number;
  effectiveMarginPercent: number;
  markupPercent: number; // نسبة الزيادة على التكلفة (Markup)
  isValid: boolean;
  errorMessage?: string;
}

export interface BreakEvenInputs {
  fixedCosts: number; // التكاليف الثابتة الشهرية (إيجار، اشتراكات، رواتب)
  sellingPrice: number; // سعر بيع الوحدة
  productCost: number; // تكلفة المنتج للوحدة
  shippingCost: number; // تكلفة الشحن للوحدة
  marketingCost: number; // تكلفة التسويق لكل طلب
  paymentFeePercent: number; // نسبة رسوم الدفع %
  paymentFeeFixed: number; // رسوم ثابتة
}

export interface BreakEvenResult {
  unitSellingPrice: number;
  unitVariableCost: number;
  unitContributionMargin: number; // هامش المساهمة للوحدة (ر.س)
  contributionMarginRatio: number; // نسبة هامش المساهمة %
  breakEvenUnits: number; // عدد الوحدات المطلوبة للتعادل
  breakEvenRevenue: number; // الإيراد المطلوب للتعادل (ر.س)
  isPossible: boolean;
  message?: string;
}

export interface DiscountImpactInputs {
  currentPrice: number;
  unitCost: number; // إجمالي التكاليف المتغيرة للوحدة (منتج + شحن + دفع + تسويق)
  plannedDiscountPercent: number;
  currentMonthlyUnits: number; // عدد الوحدات المباعة شهرياً حالياً
}

export interface DiscountImpactResult {
  originalPrice: number;
  discountedPrice: number;
  originalMarginPerUnit: number;
  discountedMarginPerUnit: number;
  originalMonthlyProfit: number;
  requiredUnitsToMaintainProfit: number;
  requiredSalesIncreasePercent: number; // نسبة الزيادة المطلوبة في المبيعات
  marginDropPercent: number;
  isLossMaking: boolean;
}

export interface MarketingRoiInputs {
  adSpend: number; // إجمالي الإنفاق الإعلاني
  totalRevenue: number; // إجمالي الإيرادات الناتجة
  totalOrders: number; // إجمالي عدد الطلبات
  averageProductCost: number; // متوسط تكلفة البضاعة للطلب
  averageShippingCost: number; // متوسط تكلفة الشحن للطلب
  paymentFeePercent: number; // نسبة الدفع %
}

export interface MarketingRoiResult {
  roas: number; // عائد الإنفاق الإعلاني (مثلاً 4.5x)
  cpa: number; // تكلفة الاستحواذ على الطلب (ر.س)
  aov: number; // متوسط قيمة الطلب (ر.س)
  totalCOGS: number;
  totalShipping: number;
  totalPaymentFees: number;
  netProfit: number;
  netRoiPercent: number;
  breakEvenRoas: number; // الحد الأدنى للـ ROAS لتحقيق التعادل
  isProfitable: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string; // Markdown or rich HTML
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  featured?: boolean;
  relatedToolSlug?: string;
  faqs?: {
    question: string;
    answer: string;
  }[];
  tableOfContents?: {
    id: string;
    title: string;
    level: number;
  }[];
}

export interface ToolMetadata {
  slug: string;
  path: string;
  title: string;
  badgeTitle: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  iconName: string;
  category: string;
  popular?: boolean;
  features: string[];
  howToUse: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  formulaExplanation: {
    formula: string;
    description: string;
    terms: { name: string; meaning: string }[];
  };
}
