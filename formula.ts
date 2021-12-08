const result = (13.88 / 100 + 1) ** 1 / 252 - 1

const tcdi = result.toFixed(8)

const tcdiAcumulado = 1 + (tcdi * 103.5) / 100

console.log(tcdiAcumulado)
