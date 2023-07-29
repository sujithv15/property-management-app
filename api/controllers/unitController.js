import Unit from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createUnit = async (req, res) => {
	console.log(req.body);
	// unit values sent from front end
	const unit = req.body
	// check if unit already exists
	const duplicate = await Unit.findOne({
		unitID: unit.unitID,
		street: unit.street,
		city: unit.city,
		state: unit.state,
		zip: unit.zip,
	})
	if (duplicate) {
		throw new BadRequestError("Unit already exists!")
	}

	// create new unit using UnitDetails model method
	const newUnit = await Unit.create(req.body)

	// send response JSON to include new unit
	res.status(StatusCodes.CREATED).json({newUnit, msg: 'Create Unit Success'})
}

// get all units, and populate each with tenant information
const getAllUnits = async (req, res) => {
	const units = await Unit.find()
	res.status(StatusCodes.OK).json({units})
}

const getUnitDetails = async (req, res) => {
	const { id } = req.params
	const unit = await Unit.findById(id).populate('tenant').populate('appliances')
	if (!unit) {
		throw new NotFoundError(`No unit with id :${id}`);
	}
	res.status(StatusCodes.OK).json({ unit })
}

const updateUnit = async (req, res) => {
	const { id } = req.params
	const unit = await Unit.findById(id)
	if (!unit) {
		throw new NotFoundError(`No unit with id :${id}`);
	}
	await Unit.findByIdAndUpdate(id, req.body)
	res.status(StatusCodes.OK).json({ msg: 'Update success' })
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

export { getAllUnits, getUnitDetails, createUnit, updateUnit, deleteUnit }