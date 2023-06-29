import Unit from "../models/Unit.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

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
	res.send('getAllUnits')
}

const getSingleUnit = async (req, res, next) => {
	res.send('getSingleUnit')
}

export { getAllUnits, getSingleUnit, createUnit }