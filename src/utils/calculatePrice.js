import { models } from '../constants/models';
import { colors } from '../constants/colors';
import { wheelPricesByModel } from '../constants/wheelPrices';
import { interiorPricesByModel } from '../constants/interiorPrices';
import { regions } from '../constants/regions';
import { autopilotOptions } from '../constants/autopilotOptions';
import { registrationMethods } from '../constants/registrationMethods';
import { deliveryOptions } from '../constants/deliveryOptions';


export function calculatePrice({ model, color, wheel, interior, region, autopilot, registrationMethod, deliveryOption, childCount = 0 }) {
  const basePrice = models.find((m) => m.key === model)?.price || 0;
  const colorPrice = colors.find((c) => c.key === color)?.price || 0;
  const regionObj = regions.find((r) => r.key === region);
  const subsidy = regionObj?.subsidyByModel?.[model] ?? 0;
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

  const totalBeforeSubsidy = basePrice + colorPrice + wheelPrice + interiorPrice + autopilotPrice + registrationMethodPrice + deliveryFee;
  const total = totalBeforeSubsidy - subsidy - childBenefit;

  return {
    basePrice,
    colorPrice,
    wheelPrice,
    interiorPrice,
    autopilotPrice,
    total,
    subsidy,
    registrationMethodPrice,
    deliveryFee,
    childBenefit
  };
}
