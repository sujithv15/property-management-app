import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import Admin from "../models/Admin.js"

const register = async (req, res) => {

	// destructure fields from request body
	const { name, email, password } = req.body

	// if any fields missing from user front end, throw error
	if (!name || !email || !password) {
		throw new BadRequestError('Please provide all values')
	}

	if (name !== process.env.ADMIN_USERNAME || email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
		throw new UnauthenticatedError('Invalid credentials')
	}

	// validate that admin not already in database
	const adminAlreadyExists = await Admin.findOne({ email })
	if (adminAlreadyExists) {
		throw new BadRequestError('Admin already exists')
	}


	// create as new admin in mongodb
	const admin = await Admin.create({ name, email, password })

	const token = admin.createJWT()

	// send response JSON to include user fields
	res.status(StatusCodes.CREATED)
	   .json({
		   admin: {
			   name: admin.name,
			   email: admin.email,
		   },
		   token: token,
	   })
}
const login = async (req, res) => {

	// destructure login obj sent from front end
	const { email, password } = req.body

	if (!email || !password) {
		throw new BadRequestError('please provide email and password')
	}

	// check Admin model in database for entered email
	// select('+password') needed since password property in Admin is hidden
	const admin = await Admin.findOne({ email }).select('+password')
	if (!admin) {
		throw new UnauthenticatedError('Invalid credentials')
	}

	// verify entered password using function we created in Admin.js
	// to compare with this.password
	const passwordVerified = await admin.comparePassword(password)
	if (!passwordVerified) {
		throw new UnauthenticatedError('Invalid credentials')
	}

	const token = admin.createJWT()

	// we do not want to send the visible password in the res json
	admin.password = undefined

	res.status(StatusCodes.OK)
	   .json({
		   admin,
		   token,
	   })
}

export { login, register }