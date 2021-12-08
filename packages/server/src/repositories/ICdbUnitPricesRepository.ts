export type CdiPrice = {
  date: Date
  price: number
  cdirate?: number
  accumulatedCdiRate?: number
}

export type CdbUnitPrice = {
  date: Date
  unitPrice: number
}

export interface ICdbUnitPricesRepository {
  processorCsvFile(): Promise<CdiPrice[]>
  processorCdiPrices(listCdiPrices: CdiPrice[], cdbRate: number): CdiPrice[]
  listUnitPricesCdb(listCdiPrices: CdiPrice[]): CdbUnitPrice[]
}
