export default function calculateCdiRate(price: number): number {
  const calculateBase = price / 100 + 1
  const fractionalExponent = Math.pow(calculateBase, 1 / 252) - 1
  const resolved = parseFloat(fractionalExponent.toFixed(8))
  return resolved
}
