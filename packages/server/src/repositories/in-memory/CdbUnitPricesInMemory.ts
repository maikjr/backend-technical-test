import { calculateCdiRate, calculateCdiAccumulated } from '../../utils'

import {
  CdiPrice,
  CdbUnitPrice,
  ICdbUnitPricesRepository
} from '../ICdbUnitPricesRepository'

export class CdbUnitPricesInMemory implements ICdbUnitPricesRepository {
  async processorCsvFile(): Promise<CdiPrice[]> {
    const cdiPrices: CdiPrice[] = [
      {
        date: '2016-11-14',
        price: 13.88
      },
      {
        date: '2016-11-16',
        price: 13.88
      },
      {
        date: '2016-11-17',
        price: 13.88
      },
      {
        date: '2016-11-18',
        price: 13.88
      },
      {
        date: '2016-11-21',
        price: 13.88
      }
    ]

    return cdiPrices
  }

  processorCdiPrices(listCdiPrices: CdiPrice[], cdbRate: number): CdiPrice[] {
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

  listUnitPricesCdb (listCdiPrices: CdiPrice[]): CdbUnitPrice[] {
    return listCdiPrices.map(cdiPrice => {
      const calculateUnitPrice = 1000 * cdiPrice.accumulatedCdiRate
      return {
        date: cdiPrice.date,
        unitPrice: parseFloat(calculateUnitPrice.toFixed(5))
      }
    })
  }
}
