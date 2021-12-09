import express, { NextFunction, Response, Request } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { router } from './routes'

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message
      })
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err}`
    })
  }
)

export { app }
