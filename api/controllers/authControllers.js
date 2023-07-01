import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import User from "../models/User.js"
import attachCookies from "../utils/attachCookies.js";

const register = async (req, res) => {
	// destructure fields from request body
	const { name, email, password } = req.body
	console.log(req.body);
	// if any fields missing from user front end, throw error
	if (!name || !email || !password) {
		throw new BadRequestError('Please provide all values')
	}
	// validate that user not already in database
	const userAlreadyExists = await User.findOne({ email })
	if (userAlreadyExists) {
		throw new BadRequestError('User already exists')
	}
	// first registered user is admin
	const isFirstUser = (await User.countDocuments({})) === 0

	// create as new user in mongodb
	const user = await User.create({ name, email, password, isAdmin: isFirstUser })

	const token = user.createJWT()
	attachCookies({ res, token })

	// send response JSON to include user fields
	res.status(StatusCodes.CREATED).json({ user: { name: user.name, email: user.email } })
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
	attachCookies({ res, token })
	res.status(StatusCodes.OK).json({...user, password: undefined})
}

const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now() + 1000),
	});
	res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

const update = async (req, res) => {
	const { id } = req.params
	const user = await User.findOne({ _id: id });
	const { email, name, unit, tenant } = req.body;

	user.unit = unit
	user.tenant = tenant

	await user.save();
	const token = user.createJWT();
	attachCookies({ res, token });

	res.status(StatusCodes.OK).json({ user });
}



export { login, register, update, logout }