export function formatCurrency (currency) {
  const formatingCurrency = new Intl.NumberFormat('pt-BR', {
    maximumSignificantDigits: 8
  }).format(currency)

  return formatingCurrency.substring(0, 8)
}
