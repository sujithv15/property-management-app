import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'

import cookieParser from "cookie-parser"

// routers
import authRouter from "./routes/authRoutes.js"
import applianceRoutes from "./routes/applianceRoutes.js";
import unitsRoutes from "./routes/unitRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";

// middleware
import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
import authenticateUser from "./middleware/authenticateUser.js"




if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}

app.use(express.json())
app.use(cookieParser())


app.use('/api/v1/authenticate', authRouter)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/admin/appliances', applianceRoutes)
app.use('/api/v1/admin/units', unitsRoutes)
app.use('/api/v1/admin/payments', paymentRoutes)
app.use('/api/v1/admin/properties', propertyRoutes)
app.use('/api/v1/admin/tenants', tenantRoutes)

app.use(notFound)
app.use(errorHandler)

export default app



