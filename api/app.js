import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import authRouter from "./routes/authRoutes.js"
import adminRouter from "./routes/adminRoutes.js";
import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";

if (process.env.NODE_ENVIRONMENT !== 'production') {
	app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
	res.json('Welcome')
})

app.get('/api', (req, res) => {
	res.json('Welcome from the backend API')
})


app.use('/api/v1', adminRouter)
app.use('/api/v1/auth', authRouter)

app.use(notFound)
app.use(errorHandler)

export default app



