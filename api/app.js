import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
// security package imports
import helmet from "helmet";
import cors from 'cors'
import xss from 'xss-clean'
import rateLimit from "express-rate-limit";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// routers imports
import authRoutes from "./routes/authRoutes.js"
import applianceRoutes from "./routes/applianceRoutes.js";
import unitsRoutes from "./routes/unitRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import accountingRoutes from "./routes/accountingRoutes.js";
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

app.use(cors({
	origin: ['https://prop-management-assistant.netlify.app', 'http://localhost:5173'],
	credentials: true
}))

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use(cookieParser(process.env.JWT_SECRET))
/*
app.set('trust proxy', 1)  // if behind reverse proxy
app.use(rateLimit({
	windowMs: 15 * 60 *1000, //15 min
	max: 100 //limit each IP to 100 req per windowMs
}))
app.use(helmet());
app.use(xss());
*/

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'))
}
// in production
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));




app.get('/', (req, res) => {
	res.send('property management assistant home')
})
app.get('/api/v1', (req, res) => {
	res.send('property management assistant api')
})

app.use('/api/v1/auth', authRoutes)  // login, logout, register
app.use('/api/v1/users', authenticateUser, authorizePermissions, userRoutes)  // getAllUsers, getUserInfo, showCurrentUser, updateUser, updateUserPassword
app.use('/api/v1/admin/appliances', authenticateUser, authorizePermissions, applianceRoutes)
app.use('/api/v1/admin/units', authenticateUser, authorizePermissions, unitsRoutes)
app.use('/api/v1/admin/accounting', authenticateUser, authorizePermissions, accountingRoutes)

// will contain all user personal routes so authentication per user middleware
app.use('/api/v1/admin/tenants', authorizePermissions, authenticateUser, tenantRoutes)

app.use(notFound)
app.use(errorHandler)

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
export default app



