import {
  ProfitCalculatorInputs,
  ProfitCalculationResult,
  DiscountSimulationItem,
  SellingPriceInputs,
  SellingPriceResult,
  BreakEvenInputs,
  BreakEvenResult,
  DiscountImpactInputs,
  DiscountImpactResult,
  MarketingRoiInputs,
  MarketingRoiResult,
} from './types';

/**
 * دالة حساب صافي الأرباح الشاملة
 */
export function calculateProfit(inputs: ProfitCalculatorInputs): ProfitCalculationResult {
  const sellingPrice = Math.max(0, inputs.sellingPrice || 0);
  const productCost = Math.max(0, inputs.productCost || 0);
  const shippingCost = Math.max(0, inputs.shippingCost || 0);
  const paymentFeePercent = Math.max(0, inputs.paymentFeePercent || 0) / 100;
  const paymentFeeFixed = Math.max(0, inputs.paymentFeeFixed || 0);
  const marketingCost = Math.max(0, inputs.marketingCost || 0);
  const discountPercent = Math.min(100, Math.max(0, inputs.discountPercent || 0));

  // حساب الخصم وسعر البيع الفعلي
  const discountAmount = sellingPrice * (discountPercent / 100);
  const netSellingPrice = Math.max(0, sellingPrice - discountAmount);

  // حساب رسوم بوابة الدفع على المبلغ المحصل الفعلي
  const paymentFee = netSellingPrice > 0 ? netSellingPrice * paymentFeePercent + paymentFeeFixed : 0;

  // إجمالي التكاليف
  const totalCosts = productCost + shippingCost + marketingCost + paymentFee;

  // صافي الربح
  const netProfit = netSellingPrice - totalCosts;

  // هامش الربح والنسب المئوية (محسوبة كنسبة من السعر الفعلي)
  const baseForPercent = netSellingPrice > 0 ? netSellingPrice : 1;
  const netMarginPercent = netSellingPrice > 0 ? (netProfit / netSellingPrice) * 100 : 0;
  const productCostPercent = (productCost / baseForPercent) * 100;
  const marketingCostPercent = (marketingCost / baseForPercent) * 100;
  const shippingCostPercent = (shippingCost / baseForPercent) * 100;
  const paymentFeePercentOfPrice = (paymentFee / baseForPercent) * 100;

  // حساب سعر التعادل للوحدة (السعر الذي يجعل الربح 0 بالضبط)
  let breakEvenPrice = 0;
  if (paymentFeePercent < 1) {
    const fixedVariableCosts = productCost + shippingCost + marketingCost + paymentFeeFixed;
    breakEvenPrice = fixedVariableCosts / (1 - paymentFeePercent);
  }

  // الحالة والتقييم
  const isProfitable = netProfit > 0;
  let statusText = 'أرباح ممتازة';
  let statusVariant: 'success' | 'warning' | 'danger' = 'success';

  if (netProfit < 0) {
    statusText = 'خسارة في هذا الطلب';
    statusVariant = 'danger';
  } else if (netMarginPercent < 15) {
    statusText = 'هامش ربح منخفض (كن حذرًا)';
    statusVariant = 'warning';
  } else if (netMarginPercent >= 30) {
    statusText = 'هامش ربح ممتاز وصحي';
    statusVariant = 'success';
  } else {
    statusText = 'هامش ربح جيد';
    statusVariant = 'success';
  }

  return {
    originalPrice: round2(sellingPrice),
    discountPercent: round2(discountPercent),
    discountAmount: round2(discountAmount),
    netSellingPrice: round2(netSellingPrice),
    productCost: round2(productCost),
    shippingCost: round2(shippingCost),
    marketingCost: round2(marketingCost),
    paymentFee: round2(paymentFee),
    totalCosts: round2(totalCosts),
    netProfit: round2(netProfit),
    netMarginPercent: round2(netMarginPercent),
    productCostPercent: round2(productCostPercent),
    marketingCostPercent: round2(marketingCostPercent),
    shippingCostPercent: round2(shippingCostPercent),
    paymentFeePercentOfPrice: round2(paymentFeePercentOfPrice),
    breakEvenPrice: round2(breakEvenPrice),
    isProfitable,
    statusText,
    statusVariant,
  };
}

/**
 * دالة محاكاة تأثير نسب الخصم المختلفة على الأرباح
 */
export function simulateDiscounts(
  inputs: ProfitCalculatorInputs,
  discountSteps: number[] = [0, 5, 10, 15, 20, 25, 30]
): DiscountSimulationItem[] {
  const baseResult = calculateProfit({ ...inputs, discountPercent: 0 });

  return discountSteps.map((percent) => {
    const res = calculateProfit({ ...inputs, discountPercent: percent });
    return {
      discountPercent: percent,
      netSellingPrice: res.netSellingPrice,
      paymentFee: res.paymentFee,
      totalCosts: res.totalCosts,
      netProfit: res.netProfit,
      netMarginPercent: res.netMarginPercent,
      isProfitable: res.isProfitable,
      differenceFromOriginalProfit: round2(res.netProfit - baseResult.netProfit),
    };
  });
}

/**
 * دالة حساب سعر البيع المستهدف لتحقيق هامش ربح محدد
 */
export function calculateSellingPrice(inputs: SellingPriceInputs): SellingPriceResult {
  const productCost = Math.max(0, inputs.productCost || 0);
  const shippingCost = Math.max(0, inputs.shippingCost || 0);
  const marketingCost = Math.max(0, inputs.marketingCost || 0);
  const paymentFeePercent = Math.max(0, inputs.paymentFeePercent || 0) / 100;
  const paymentFeeFixed = Math.max(0, inputs.paymentFeeFixed || 0);
  const targetMarginPercent = Math.max(0, inputs.targetMarginPercent || 0) / 100;

  const totalFixedVariable = productCost + shippingCost + marketingCost + paymentFeeFixed;
  const denominator = 1 - (paymentFeePercent + targetMarginPercent);

  if (denominator <= 0) {
    return {
      targetSellingPrice: 0,
      paymentFee: 0,
      totalCosts: totalFixedVariable,
      expectedNetProfit: 0,
      effectiveMarginPercent: 0,
      markupPercent: 0,
      isValid: false,
      errorMessage: 'مجموع نسبة رسوم الدفع وهامش الربح المطلوب يجب أن يكون أقل من 100%',
    };
  }

  const targetSellingPrice = totalFixedVariable / denominator;
  const paymentFee = targetSellingPrice * paymentFeePercent + paymentFeeFixed;
  const totalCosts = productCost + shippingCost + marketingCost + paymentFee;
  const expectedNetProfit = targetSellingPrice - totalCosts;
  const effectiveMarginPercent = (expectedNetProfit / targetSellingPrice) * 100;
  const markupPercent = totalCosts > 0 ? (expectedNetProfit / totalCosts) * 100 : 0;

  return {
    targetSellingPrice: round2(targetSellingPrice),
    paymentFee: round2(paymentFee),
    totalCosts: round2(totalCosts),
    expectedNetProfit: round2(expectedNetProfit),
    effectiveMarginPercent: round2(effectiveMarginPercent),
    markupPercent: round2(markupPercent),
    isValid: true,
  };
}

/**
 * دالة حساب نقطة التعادل (Break-Even Analysis)
 */
export function calculateBreakEven(inputs: BreakEvenInputs): BreakEvenResult {
  const fixedCosts = Math.max(0, inputs.fixedCosts || 0);
  const sellingPrice = Math.max(0, inputs.sellingPrice || 0);
  const productCost = Math.max(0, inputs.productCost || 0);
  const shippingCost = Math.max(0, inputs.shippingCost || 0);
  const marketingCost = Math.max(0, inputs.marketingCost || 0);
  const paymentFeePercent = Math.max(0, inputs.paymentFeePercent || 0) / 100;
  const paymentFeeFixed = Math.max(0, inputs.paymentFeeFixed || 0);

  const unitPaymentFee = sellingPrice * paymentFeePercent + paymentFeeFixed;
  const unitVariableCost = productCost + shippingCost + marketingCost + unitPaymentFee;
  const unitContributionMargin = sellingPrice - unitVariableCost;
  const contributionMarginRatio = sellingPrice > 0 ? (unitContributionMargin / sellingPrice) * 100 : 0;

  if (unitContributionMargin <= 0) {
    return {
      unitSellingPrice: round2(sellingPrice),
      unitVariableCost: round2(unitVariableCost),
      unitContributionMargin: round2(unitContributionMargin),
      contributionMarginRatio: round2(contributionMarginRatio),
      breakEvenUnits: 0,
      breakEvenRevenue: 0,
      isPossible: false,
      message: 'سعر البيع أقل من التكلفة المتغيرة للوحدة! كل عملية بيع تسبب خسارة ولن تصل لنقطة التعادل.',
    };
  }

  const breakEvenUnits = Math.ceil(fixedCosts / unitContributionMargin);
  const breakEvenRevenue = breakEvenUnits * sellingPrice;

  return {
    unitSellingPrice: round2(sellingPrice),
    unitVariableCost: round2(unitVariableCost),
    unitContributionMargin: round2(unitContributionMargin),
    contributionMarginRatio: round2(contributionMarginRatio),
    breakEvenUnits,
    breakEvenRevenue: round2(breakEvenRevenue),
    isPossible: true,
  };
}

/**
 * دالة حساب تأثير الخصم والزيادة المطلوبة في المبيعات
 */
export function calculateDiscountImpact(inputs: DiscountImpactInputs): DiscountImpactResult {
  const currentPrice = Math.max(0, inputs.currentPrice || 0);
  const unitCost = Math.max(0, inputs.unitCost || 0);
  const discountPercent = Math.min(100, Math.max(0, inputs.plannedDiscountPercent || 0));
  const currentMonthlyUnits = Math.max(1, inputs.currentMonthlyUnits || 1);

  const discountedPrice = currentPrice * (1 - discountPercent / 100);
  const originalMarginPerUnit = currentPrice - unitCost;
  const discountedMarginPerUnit = discountedPrice - unitCost;

  const originalMonthlyProfit = originalMarginPerUnit * currentMonthlyUnits;
  const isLossMaking = discountedMarginPerUnit <= 0;

  let requiredUnitsToMaintainProfit = 0;
  let requiredSalesIncreasePercent = 0;

  if (discountedMarginPerUnit > 0) {
    requiredUnitsToMaintainProfit = Math.ceil(originalMonthlyProfit / discountedMarginPerUnit);
    requiredSalesIncreasePercent =
      ((requiredUnitsToMaintainProfit - currentMonthlyUnits) / currentMonthlyUnits) * 100;
  }

  const marginDropPercent =
    originalMarginPerUnit > 0
      ? ((originalMarginPerUnit - discountedMarginPerUnit) / originalMarginPerUnit) * 100
      : 0;

  return {
    originalPrice: round2(currentPrice),
    discountedPrice: round2(discountedPrice),
    originalMarginPerUnit: round2(originalMarginPerUnit),
    discountedMarginPerUnit: round2(discountedMarginPerUnit),
    originalMonthlyProfit: round2(originalMonthlyProfit),
    requiredUnitsToMaintainProfit,
    requiredSalesIncreasePercent: round2(Math.max(0, requiredSalesIncreasePercent)),
    marginDropPercent: round2(marginDropPercent),
    isLossMaking,
  };
}

/**
 * دالة حساب عائد الإعلانات وكفاءة التسويق (ROAS & Marketing ROI)
 */
export function calculateMarketingRoi(inputs: MarketingRoiInputs): MarketingRoiResult {
  const adSpend = Math.max(0, inputs.adSpend || 0);
  const totalRevenue = Math.max(0, inputs.totalRevenue || 0);
  const totalOrders = Math.max(1, inputs.totalOrders || 1);
  const averageProductCost = Math.max(0, inputs.averageProductCost || 0);
  const averageShippingCost = Math.max(0, inputs.averageShippingCost || 0);
  const paymentFeePercent = Math.max(0, inputs.paymentFeePercent || 0) / 100;

  const roas = adSpend > 0 ? totalRevenue / adSpend : 0;
  const cpa = adSpend / totalOrders;
  const aov = totalRevenue / totalOrders;

  const totalCOGS = averageProductCost * totalOrders;
  const totalShipping = averageShippingCost * totalOrders;
  const totalPaymentFees = totalRevenue * paymentFeePercent;

  const totalAllCosts = adSpend + totalCOGS + totalShipping + totalPaymentFees;
  const netProfit = totalRevenue - totalAllCosts;
  const netRoiPercent = adSpend > 0 ? (netProfit / adSpend) * 100 : 0;

  // Break-even ROAS
  // Gross Margin = (Total Revenue - COGS - Shipping - Fees) / Total Revenue
  const variableCostRatio =
    totalRevenue > 0 ? (totalCOGS + totalShipping + totalPaymentFees) / totalRevenue : 0;
  const grossMarginRatio = 1 - variableCostRatio;
  const breakEvenRoas = grossMarginRatio > 0 ? 1 / grossMarginRatio : 0;

  return {
    roas: round2(roas),
    cpa: round2(cpa),
    aov: round2(aov),
    totalCOGS: round2(totalCOGS),
    totalShipping: round2(totalShipping),
    totalPaymentFees: round2(totalPaymentFees),
    netProfit: round2(netProfit),
    netRoiPercent: round2(netRoiPercent),
    breakEvenRoas: round2(breakEvenRoas),
    isProfitable: netProfit > 0,
  };
}

// دالة مساعدة لتقريب الأرقام لمنزلتين عشريتين بدقة
export function round2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
