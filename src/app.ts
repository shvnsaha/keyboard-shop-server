import express, { Application } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
const app: Application = express()

// parsers:
app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173','https://keyboard-shop-client-seven.vercel.app'] }))

app.get('/', (req, res) => {
  res.send('Welcome to mechanical store server')
})

// application routes
app.use('/api', router)


app.use(globalErrorHandler)

//Not Found
app.use(notFound)

export default app
