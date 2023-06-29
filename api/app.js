import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
/*
import cookieParser from "cookie-parser"
app.use(cookieParser)
*/
app.use(express.json())
// routers
import authRouter from "./routes/authRoutes.js"
import applianceRoutes from "./routes/applianceRoutes.js";
import unitsRoutes from "./routes/unitsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// middleware

import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";


if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}


app.get('/', (req, res) => {
	res.json('Welcome')
})
app.get('/api', (req, res) => {
	res.json('Welcome from the backend API')
})


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/admin/user', userRoutes)
app.use('/api/v1/admin/appliances', applianceRoutes)
app.use('/api/v1/units', unitsRoutes)
app.use('/api/v1/admin/payments', paymentRoutes)

app.use(notFound)
app.use(errorHandler)

export default app



