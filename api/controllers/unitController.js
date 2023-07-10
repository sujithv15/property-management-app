import Unit from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createUnit = async (req, res) => {
	// create new unit using Unit model method
	const newUnit = await Unit.create(req.body)
	// send response JSON to include new unit
	res.status(StatusCodes.CREATED).json({newUnit})
}

// get all units, and populate each with tenant information
const getAllUnits = async (req, res) => {
	const units = await Unit.find().populate("tenant")
	res.status(StatusCodes.OK).json({units})
}

const getSingleUnit = async (req, res) => {
	const { id } = req.params
	const unit = await Unit.findOne({_id: id})
	if (!unit) {
		throw new NotFoundError(`No unit with id :${id}`);
	}
	res.status(StatusCodes.OK).json({unit})
}

const updateUnit = async (req, res) => {
	const { id } = req.params
	const unit = await Unit.findById(id)
	if (!unit) {
		throw new NotFoundError(`No unit with id :${id}`);
	}
	await Unit.findByIdAndUpdate(id, req.body)
	res.status(StatusCodes.OK).json({unit})
}

const deleteUnit = async (req, res) => {
	const { id } = req.params
	const unit = await Unit.findById(id)
	if (!unit) {
		throw new NotFoundError(`No unit with id :${id}`);
	}
	await Unit.findByIdAndDelete(id)
	res.status(StatusCodes.OK).json({unit})
}

export { getAllUnits, getSingleUnit, createUnit, updateUnit, deleteUnit }