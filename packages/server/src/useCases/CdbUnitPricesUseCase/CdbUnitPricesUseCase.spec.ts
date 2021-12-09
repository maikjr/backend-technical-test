import { CdbUnitPricesInMemory } from '../../repositories/in-memory/CdbUnitPricesInMemory'
import { CdbUnitPricesUseCase } from './CdbUnitPricesUseCase'
import { ICdbUnitPricesRequestDTO } from './CdbUnitPricesbDTO'
describe('Calculate CDB unit prices', () => {
  let cdbUnitPricesRepository: CdbUnitPricesInMemory
  let cdbUnitPricesUseCase: CdbUnitPricesUseCase

  beforeAll(() => {
    cdbUnitPricesRepository = new CdbUnitPricesInMemory()
    cdbUnitPricesUseCase = new CdbUnitPricesUseCase(cdbUnitPricesRepository)
  })
  it('should be able to calculate cdb unit prices', async () => {
    const cdbUnitPricesRequest: ICdbUnitPricesRequestDTO = {
      investmentDate: '2016-11-14',
      cdbRate: 103.5,
      currentDate: '2016-12-26'
    }

    const listCdbUnitPrices = await cdbUnitPricesUseCase.execute(
      cdbUnitPricesRequest
    )
    expect(listCdbUnitPrices).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: expect.any(String),
          unitPrice: expect.any(Number)
        })
      ])
    )

    expect(listCdbUnitPrices.pop().unitPrice).toBe(1002.67269)
  })
})
