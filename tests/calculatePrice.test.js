import { calculatePrice } from '../src/utils/calculatePrice';

describe('calculatePrice', () => {
  test('base pricing with default options', () => {
    const result = calculatePrice({
      model: 'rwd',
      color: 'stealthGrey',
      wheel: 'crossflow19',
      interior: 'allBlack',
      region: 'none',
      autopilot: 'none',
      registrationMethod: 'self',
      deliveryOption: 'self',
      regions: []
    });

    expect(result.basePrice).toBe(52990000);
    expect(result.colorPrice).toBe(0);
    expect(result.wheelPrice).toBe(0);
    expect(result.carTotalPrice).toBe(53116500);
    expect(result.total).toBe(53116500);
  });

  test('pricing with subsidy and child benefit', () => {
    const regions = [{ key: 'seoul', rwd: 3000000, longrange: 2000000 }];
    const result = calculatePrice({
      model: 'longrange',
      color: 'ultraRed',
      wheel: 'induction20',
      interior: 'blackWhite',
      region: 'seoul',
      autopilot: 'eap',
      registrationMethod: 'agency',
      deliveryOption: 'request',
      childCount: 3,
      regions
    });

    expect(result.subsidy).toBe(2000000);
    expect(result.childBenefit).toBe(2000000);
    expect(result.carTotalPrice).toBe(74530000);
    expect(result.total).toBe(70530000);
  });
});
