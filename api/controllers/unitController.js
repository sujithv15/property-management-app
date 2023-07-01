import Unit from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createUnit = async (req, res, next) => {
	// create new unit using Unit model method
	const newUnit = await Unit.create(req.body)
	// send response JSON to include new unit
	res.status(StatusCodes.CREATED).json({newUnit})
}

const getAllUnits = async (req, res, next) => {
	const units = await Unit.find()
	res.send(units)
	res.status(StatusCodes.OK).json({units})
}

const getSingleUnit = async (req, res, next) => {
	const { id } = req.params
	const unit = await Unit.findOne({_id: id})
	if (!unit) {
		throw new NotFoundError(`No unit with id :${id}`);
	}
	res.status(StatusCodes.OK).json({unit})
}

export { getAllUnits, getSingleUnit, createUnit }