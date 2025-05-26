import { models } from '../constants/models';
import { colors } from '../constants/colors';
import { wheelPricesByModel } from '../constants/wheelPrices';
import { interiorPricesByModel } from '../constants/interiorPrices';
import { regions } from '../constants/regions';
import { autopilotOptions } from '../constants/autopilotOptions';

export function calculatePrice({ model, color, wheel, interior, region, autopilot }) {
  const basePrice = models.find((m) => m.key === model)?.price || 0;
  const colorPrice = colors.find((c) => c.key === color)?.price || 0;
  const regionObj = regions.find((r) => r.key === region);
  const subsidy = regionObj?.subsidyByModel?.[model] ?? 0;
  const autopilotPrice = autopilotOptions.find((opt) => opt.key === autopilot)?.price || 0;

  const wheelPrice =
    wheelPricesByModel[model]?.[wheel] !== undefined
      ? wheelPricesByModel[model][wheel]
      : 0;

  const interiorPrice =
    interiorPricesByModel[model]?.[interior] !== undefined
      ? interiorPricesByModel[model][interior]
      : 0;

  const totalBeforeSubsidy = basePrice + colorPrice + wheelPrice + interiorPrice + autopilotPrice;
  const total = totalBeforeSubsidy - subsidy;

  return {
    basePrice,
    colorPrice,
    wheelPrice,
    interiorPrice,
    autopilotPrice,
    total,
    subsidy,
  };
}
