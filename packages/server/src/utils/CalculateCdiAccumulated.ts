export default function calculateCdiAccumulated (
  tcdi: number,
  cdbRate: number
): number {
  const calculated = 1 + (tcdi * cdbRate) / 100
  return calculated
}
