export type CdiPrice = {
  date: Date | string
  price: number
  cdirate?: number
  accumulatedCdiRate?: number
}

export type CdbUnitPrice = {
  date: Date | string
  unitPrice: number
}

export interface ICdbUnitPricesRepository {
  processorCsvFile(): Promise<CdiPrice[]>
  processorCdiPrices(listCdiPrices: CdiPrice[], cdbRate: number): CdiPrice[]
  listUnitPricesCdb(listCdiPrices: CdiPrice[]): CdbUnitPrice[]
}
