import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import Unit from "../models/Unit.js";
import User from "../models/User.js"


const getUnitDetails = async (req, res) => {
	console.log(req.user.userID);
	const user = await User.findById(req.user.userID)
	const unit = await Unit.findById(user.unit).populate('tenant').populate('appliances')
	if (!unit) {
		throw new NotFoundError(`No unit with id :${id}`);
	}
	res.status(StatusCodes.OK).json({ unit })
}

export  { getUnitDetails }