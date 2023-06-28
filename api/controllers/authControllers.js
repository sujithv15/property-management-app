import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import User from "../models/User.js"
import Admin from "../models/Admin.js"

const register = async (req, res) => {

	// destructure fields from request body
	const { name, email, password } = req.body

	// if any fields missing from user front end, throw error
	if (!name || !email || !password) {
		throw new BadRequestError('Please provide all values')
	}

	// validate that user not already in database
	const UserAlreadyExists = await User.findOne({ email })
	if (UserAlreadyExists) {
		throw new BadRequestError('User already exists')
	}

	// create as new user in mongodb
	const user = await User.create({ name, email, password })

	const token = user.createJWT()

	// send response JSON to include user fields
	res.status(StatusCodes.CREATED)
	   .json({
		   user: {
			   name: user.name,
			   email: user.email,
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

	// check User model in database for entered email
	// select('+password') needed since password property in User is hidden
	const user = await User.findOne({ email }).select('+password')
	if (!user) {
		throw new UnauthenticatedError('Invalid credentials')
	}

	// verify entered password using function we created in User.js
	// to compare with this.password
	const passwordVerified = await user.comparePassword(password)
	if (!passwordVerified) {
		throw new UnauthenticatedError('Invalid credentials')
	}

	const token = user.createJWT()

	// we do not want to send the visible password in the res json
	user.password = undefined

	res.status(StatusCodes.OK)
	   .json({
		   user,
		   token,
	   })
}

// login for admin
const _login = async (req, res) => {

	// destructure login obj sent from front end
	const { email, password } = req.body

	if (!email || !password) {
		throw new BadRequestError('please provide email and password')
	}

	// check User model in database for entered email
	// select('+password') needed since password property in User is hidden
	const admin = await Admin.findOne({ email }).select('+password')
	if (!admin) {
		throw new UnauthenticatedError('Invalid credentials')
	}

	// verify entered password using function we created in User.js
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

export { login, register, _login }