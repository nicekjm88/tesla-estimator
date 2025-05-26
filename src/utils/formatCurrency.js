export function formatCurrencyKRW(value) {
  if (typeof value !== 'number') return value;
  return `${value.toLocaleString('ko-KR')}원`;
}
