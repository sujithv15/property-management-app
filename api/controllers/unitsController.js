import Unit from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createUnit = async (req, res, next) => {
	// destructure unit obj sent from front end
	const { status, tenant, unitID, streetName, city, state, zip, rent, fmrRent, appliances } = req.body

	if (!status || !unitID || !streetName || !city || !state || !zip || !fmrRent) {
		throw new BadRequestError('please provide completed unit information')
	}

	// create new unit using Unit model method
	const newUnit = await Unit.create({ status, tenant, unitID, streetName, city, state, zip, rent, fmrRent, appliances })

	// send response JSON to include new unit
	res.status(StatusCodes.CREATED)
	   .json({newUnit})
}

const getAllUnits = async (req, res, next) => {
	const units = await Unit.find()
	res.send(units)
}

const getSingleUnit = async (req, res, next) => {
	const { id } = req.params
	const unit = await Unit.findOne({unitID: id})
	if (!unit) {
		throw new NotFoundError(`No unit with id :${id}`);
	}
	res.send(unit)
}

export { getAllUnits, getSingleUnit, createUnit }