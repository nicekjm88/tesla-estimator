// constants/childBenefit.js
export const CHILD_BENEFIT_RULES = [
  { min: 4, benefit: 3000000 },
  { min: 3, benefit: 2000000 },
  { min: 2, benefit: 1000000 },
  { min: 0, benefit: 0 },
];

export function getChildBenefit(childrenUnder18) {
  for (const rule of CHILD_BENEFIT_RULES) {
    if (childrenUnder18 >= rule.min) return rule.benefit;
  }
  return 0;
}
