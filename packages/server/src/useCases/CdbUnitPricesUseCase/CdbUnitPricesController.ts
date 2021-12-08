import { Request, Response } from 'express'
import { CdbUnitPricesUseCase } from './CdbUnitPricesUseCase'

export class CdbUnitPricesController {
  constructor(private cdbUnitPricesUseCase: CdbUnitPricesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { investmentDate, cdbRate, currentDate } = request.body
    try {
      const cdbPrices = await this.cdbUnitPricesUseCase.execute({
        investmentDate,
        cdbRate,
        currentDate
      })
      return response.status(200).send({ cdbPrices })
    } catch (err) {
      console.log(err)
      return response.status(300).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
