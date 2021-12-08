import { Router } from 'express'

import { cdbUnitPricesController } from './useCases/CdbUnitPricesUseCase'

const router = Router()

router.get('/', (request, response) => {
  return response.status(201).json({ message: 'Hello, friend!' })
})

router.get('/index', (request, response) => {
  return cdbUnitPricesController.handle(request, response)
})
export { router }
