export function toCurrency(number: number) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
}
