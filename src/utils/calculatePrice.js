import { models } from '../constants/models';
import { colors } from '../constants/colors';
import { wheelPricesByModel } from '../constants/wheelPrices';
import { interiorPricesByModel } from '../constants/interiorPrices';
import { autopilotOptions } from '../constants/autopilotOptions';
import { registrationMethods } from '../constants/registrationMethods';
import { deliveryOptions } from '../constants/deliveryOptions';

export function calculatePrice({
  model,
  color,
  wheel,
  interior,
  region,
  autopilot,
  registrationMethod,
  deliveryOption,
  childCount = 0,
  regions = [] // regions를 인자로 받음
}) {
  const basePrice = models.find((m) => m.key === model)?.price || 0;
  const colorPrice = colors.find((c) => c.key === color)?.price || 0;
  const regionObj = regions.find((r) => r.key === region);
  const subsidy = regionObj && regionObj[model] ? regionObj[model] : 0;
  const autopilotPrice = autopilotOptions.find((opt) => opt.key === autopilot)?.price || 0;
  const registrationMethodPrice = registrationMethods.find((m) => m.key === registrationMethod)?.price || 0;
  const deliveryFee = deliveryOptions.find((o) => o.key === deliveryOption)?.price || 0;

  const wheelPrice =
    wheelPricesByModel[model]?.[wheel] !== undefined
      ? wheelPricesByModel[model][wheel]
      : 0;

  const interiorPrice =
    interiorPricesByModel[model]?.[interior] !== undefined
      ? interiorPricesByModel[model][interior]
      : 0;

  let childBenefit = 0;
  if (childCount === 2) childBenefit = 1000000;
  else if (childCount === 3) childBenefit = 2000000;
  else if (childCount >= 4) childBenefit = 3000000;

  // 1. 차량 총액 (보조금/혜택 전, 취득세 기준)
  const carTotalPrice = basePrice + colorPrice + wheelPrice + interiorPrice + autopilotPrice + registrationMethodPrice + deliveryFee;

  // 2. 부가세 제외 과세표준(공급가액)
  const supplyPrice = Math.round((basePrice + colorPrice + wheelPrice + interiorPrice) / 1.1);

  // 3. 취득세 (7%)
  let acquisitionTax = Math.round(supplyPrice * 0.07);

  // 4. 감면 한도 적용(전기차 기준 1,400,000, 정책 변경 가능)
  const ACQUISITION_TAX_DISCOUNT_LIMIT = 1400000;
  acquisitionTax = Math.max(acquisitionTax - ACQUISITION_TAX_DISCOUNT_LIMIT, 0);

  // 5. 실 결제액(보조금·혜택 차감)
  const total = carTotalPrice - subsidy - childBenefit;

  // 6. 총 소요비용(실 결제액 + 취득세)
  const totalWithTax = total + acquisitionTax;

  return {
    basePrice,
    colorPrice,
    wheelPrice,
    interiorPrice,
    autopilotPrice,
    registrationMethodPrice,
    deliveryFee,
    subsidy,
    childBenefit,
    carTotalPrice,    // 취득세 기준액(부가세 포함 총액)
    supplyPrice,      // 공급가액(부가세 제외)
    acquisitionTax,   // 최종 취득세(감면 적용)
    total,            // 실 결제액(취득세 제외)
    totalWithTax      // 실 결제액 + 취득세(최종 소요 비용)
  };
}
