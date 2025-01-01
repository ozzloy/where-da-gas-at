export function convertNanosToUSD(units, nanos) {
  const fractionalDollars = nanos / 1_000_000_000;
  const totalPrice = parseFloat(units) + fractionalDollars;
  return totalPrice.toFixed(2); // Format to 2 decimal places
}
