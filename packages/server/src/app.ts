import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { router } from './routes'

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(router)

export { app }
