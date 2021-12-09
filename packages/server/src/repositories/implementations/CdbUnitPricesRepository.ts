import { parseFile } from 'fast-csv'

import {
  formateDate,
  calculateCdiRate,
  calculateCdiAccumulated
} from '../../utils'

import {
  CdiPrice,
  CdbUnitPrice,
  ICdbUnitPricesRepository
} from '../ICdbUnitPricesRepository'

export class CdbUnitPricesRepository implements ICdbUnitPricesRepository {
  async processorCsvFile (): Promise<CdiPrice[]> {
    return new Promise((resolve, reject) => {
      const data = []
      parseFile('./src/csv/cdi_prices.csv', { skipLines: 1 })
        .on('error', error => reject(error))
        .on('data', row => {
          const processor = { date: formateDate(row[1]), price: row[2] }
          data.push(processor)
        })
        .on('end', () => resolve(data))
    })
  }

  processorCdiPrices (listCdiPrices: CdiPrice[], cdbRate: number): CdiPrice[] {
    let accumulatedCdiRate = 1

    const sortListCdiPrices = listCdiPrices.reverse()

    return sortListCdiPrices.map(cdi => {
      const cdirate = calculateCdiRate(cdi.price)

      accumulatedCdiRate =
        accumulatedCdiRate * calculateCdiAccumulated(cdirate, cdbRate)

      return {
        ...cdi,
        cdirate,
        accumulatedCdiRate: parseFloat(accumulatedCdiRate.toFixed(8))
      }
    })
  }

  listUnitPricesCdb(listCdiPrices: CdiPrice[]): CdbUnitPrice[] {
    return listCdiPrices.map(cdiPrice => {
      const calculateUnitPrice = 1000 * cdiPrice.accumulatedCdiRate
      return {
        date: cdiPrice.date,
        unitPrice: parseFloat(calculateUnitPrice.toFixed(5))
      }
    })
  }
}
