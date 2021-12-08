import { ICdbUnitPricesRepository } from '../../repositories/ICdbUnitPricesRepository'
import { ICdbUnitPricesRequestDTO } from './CdbUnitPricesbDTO'
export class CdbUnitPricesUseCase {
  constructor(private CdbUnitPrices: ICdbUnitPricesRepository) {}

  async execute (data: ICdbUnitPricesRequestDTO) {
    const processorCsvFile = await this.CdbUnitPrices.processorCsvFile()
    const findCdiByDate = processorCsvFile.filter(
      cdi =>
        new Date(cdi.date) >= new Date(data.investmentDate) &&
        new Date(cdi.date) < new Date(data.currentDate)
    )

    const processorCdiPrices = this.CdbUnitPrices.processorCdiPrices(
      findCdiByDate,
      data.cdbRate
    )

    const listUnitPricesCdb =
      this.CdbUnitPrices.listUnitPricesCdb(processorCdiPrices)

    return listUnitPricesCdb
  }
}
