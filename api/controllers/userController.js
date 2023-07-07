import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import { attachCookies, createJWT } from "../utils/index.js";

const getAllUsers = async (req, res) => {
	const users = await User.find({ isAdmin: false })
	res.status(StatusCodes.OK).json({ users })
}

const showCurrentUser = async (req, res) => {
	res.status(StatusCodes.OK).json({ user: req.user })
}

const getUserInfo = async (req, res) => {
	const { id } = req.params
	const user = await User.findById(id)
	if (!user) {
		throw new NotFoundError(`No user with id: ${id}`)
	}
	res.status(StatusCodes.OK).json({ user })
}

const updateUser = async (req, res) => {
	// destructure fields we allow to be changed from request body
	const { lastName, firstName, email } = req.body;

	// if any fields missing from user front end, throw error
	if (!lastName|| !firstName || !email) {
		throw new BadRequestError('please provide email and password')
	}
	// allow mongo to take care of validations
	const user = await User.findByIdAndUpdate(
		req.user.userID,
		{ lastName, firstName, email },
		{ new: true, runValidators: true}
	)

	// user variable with just the fields we want to send
	const userInfo = { userID: user._id, isAdmin: user.isAdmin }

	// create jwt with jwt.sign
	const token = createJWT({ payload: userInfo })

	// create cookie in the response, where we attach token
	attachCookies({ res, token });

	res.status(StatusCodes.OK).json({ user: { lastName: user.lastName, firstName: user.firstName, email: user.email } });
}

const updateUserPassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body
	if (!oldPassword|| !newPassword) {
		throw new BadRequestError('please provide old and new passwords')
	}
	// find user with the userID in req.user
	const user = await User.findById(req.user.userID).select('+password')
	// don't really need to verify if user exists, since its being done on the middleware
	if (!user) {
		throw new NotFoundError(`No user with id: ${req.user.userID}`)
	}
	// verify that oldPassword is the correct password with User function
	const passwordVerified = await user.comparePassword(oldPassword)
	if (!passwordVerified) {
		throw new UnauthenticatedError('Invalid credentials')
	}
	// set to new password
	user.password = newPassword
	// pre-save function from User is invoked, and newPassword gets properly hashed and saved
	await user.save()
	res.status(StatusCodes.OK).json({ msg: 'Password successfully updated'})
}

export { getAllUsers, getUserInfo, updateUser, updateUserPassword, showCurrentUser }