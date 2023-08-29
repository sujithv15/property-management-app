import Appliance from "../models/Appliance.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Unit from "../models/Unit.js";

const createAppliance = async (req, res) => {
	// destructure unit_id
	const { unit } = req.body

	if (!unit) {
		throw new BadRequestError('please provide unit')
	}
	// retrieve unit mongo object
	const unitForAppliance = await Unit.findById(unit)
	// create new appliance using Appliance model method specifying unit
	const newAppliance = await Appliance.create({ ...req.body, unit: unitForAppliance})
	// add appliance to appliances array in unit object
	unitForAppliance.appliances.push(newAppliance)
	await Unit.findByIdAndUpdate(unit, unitForAppliance)
	// send response JSON to include appliance
	res.status(StatusCodes.CREATED)
	   .json({newAppliance})
}

const updateAppliance = async (req, res) => {
	const appliance = await Appliance.findById(req.params.id)
	if (!appliance) {
		throw new NotFoundError(`No appliance with id :${req.params.id}`);
	}
	await Appliance.findByIdAndUpdate(req.params.id, req.body)
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