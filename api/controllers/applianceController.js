import Appliance from "../models/Appliance.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createAppliance = async (req, res) => {
	// destructure appliance obj sent from front end
	const { appliance, unit, datePurchased, repairs, warranty, receipt } = req.body
	if (!appliance || !unit) {
		throw new BadRequestError('please provide appliance and unit')
	}
	// create new appliance using Appliance model method
	const newAppliance = await Appliance.create({ unit, appliance, datePurchased, repairs, warranty, receipt })
	// send response JSON to include appliance
	res.status(StatusCodes.CREATED)
	   .json({newAppliance})
}

const updateAppliance = async (req, res) => {
	const { id } = req.params
	const appliance = await Appliance.findById(id)
	if (!appliance) {
		throw new NotFoundError(`No appliance with id :${id}`);
	}
	await Appliance.findByIdAndUpdate(id, req.body)
	res.status(StatusCodes.OK).json( {appliance} )

}

const getAllAppliances = async (req, res) => {
	const appliances = await Appliance.find()
	res.status(StatusCodes.OK).json({ appliances })
}

const getApplianceDetails = async (req, res) => {
	const { id } = req.params
	const appliance = await Appliance.findOne({_id: id})
	if (!appliance) {
		throw new NotFoundError(`No appliance with id :${id}`);
	}
	res.json(StatusCodes.OK).json({ appliance })
}

export { createAppliance, updateAppliance, getAllAppliances, getApplianceDetails }