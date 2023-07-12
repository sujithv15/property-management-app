import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
// security package imports
import helmet from "helmet";
import cors from 'cors'
//import xss from 'xss-clean'
import rateLimit from "express-rate-limit";
// routers imports
import authRouter from "./routes/authRoutes.js"
import applianceRoutes from "./routes/applianceRoutes.js";
import unitsRoutes from "./routes/unitRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
// remaining middleware imports
import morgan from 'morgan'
import cookieParser from "cookie-parser"
import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
import { authenticateUser, authorizePermissions } from "./middleware/authentication.js"

//-------------------//
const app = express()
dotenv.config()

app.set('trust proxy', 1)  // if behind reverse proxy
app.use(rateLimit({
	windowMs: 15 * 60 *1000, //15 min
	max: 100 //limit each IP to 100 req per windowMs
}))
app.use(helmet());
app.use(cors({
	origin: 'http://localhost:5173',
	credentials: true
}))
//app.use(xss());
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))


app.get('/', (req, res) => {
	res.send('property management api')
})
app.get('/api/v1', (req, res) => {
	console.log(req.signedCookies);
	res.send('property management api')
})

app.use('/api/v1/auth', authRouter)  // login, logout, register
app.use('/api/v1/users', authenticateUser, authorizePermissions, userRoutes)  // getAllUsers, getUserInfo, showCurrentUser, updateUser, updateUserPassword
app.use('/api/v1/admin/appliances', authenticateUser, authorizePermissions, applianceRoutes)
app.use('/api/v1/admin/units', authenticateUser, authorizePermissions, unitsRoutes)
app.use('/api/v1/admin/payments', paymentRoutes)

// will contain all user personal routes so authentication per user middleware
app.use('/api/v1/tenants', authorizePermissions, authenticateUser, tenantRoutes)

app.use(notFound)
app.use(errorHandler)

export default app



