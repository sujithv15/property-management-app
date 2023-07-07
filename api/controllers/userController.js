import User from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import { attachCookies, createJWT } from "../utils/index.js";

const getAllUsers = async (req, res, next) => {
	res.send('getAllUsers')
}

const showCurrentUser = async (req, res, next) => {
	res.send('showCurrentUser')
}
const getUserInfo = async (req, res, next) => {
	res.send('getUserInfo')
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

}

export { getAllUsers, getUserInfo, updateUser, updateUserPassword, showCurrentUser }