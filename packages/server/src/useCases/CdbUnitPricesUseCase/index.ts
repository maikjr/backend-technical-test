import { CdbUnitPricesRepository } from '../../repositories/implementations/CdbUnitPricesRepository'
import { CdbUnitPricesUseCase } from './CdbUnitPricesUseCase'
import { CdbUnitPricesController } from './CdbUnitPricesController'

const cdiUnitPricesRepository = new CdbUnitPricesRepository()

const cdbUnitPricesUseCase = new CdbUnitPricesUseCase(cdiUnitPricesRepository)

const cdbUnitPricesController = new CdbUnitPricesController(
  cdbUnitPricesUseCase
)

export { cdbUnitPricesUseCase, cdbUnitPricesController }
