import Appliance from "../models/Appliance.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createAppliance = async (req, res, next) => {

	// destructure appliance obj sent from front end
	const { appliance, unit, datePurchased, repairs, warranty, receipt } = req.body

	if (!appliance || !unit) {
		throw new BadRequestError('please provide appliance and unit')
	}

	// create new appliance using Appliance model method
	const newAppliance = await Appliance.create({ appliance, unit, datePurchased, repairs, warranty, receipt })

	// send response JSON to include appliance
	res.status(StatusCodes.CREATED)
	   .json({newAppliance})
	/*
	try {
		const savedAppliance = await newAppliance.save()
		res.status(StatusCodes.CREATED).json(savedAppliance)
	} catch (error) {
		console.log(error);
		next(error)
	}
	*/

}
const updateAppliance = async (req, res, next) => {
	try {
		const updatedAppliance = await Appliance.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		)
		res.status(StatusCodes.OK).json(updatedAppliance)
	} catch (error) {
		console.log(error);
		next(error)
	}
}

const getAllAppliances = async (req, res, next) => {
	const appliances = await Appliance.find()
	res.send(appliances)
}

const getSingleAppliance = async (req, res, next) => {
	const { id } = req.params
	const appliance = await Appliance.findOne({_id: id})
	if (!appliance) {
		throw new NotFoundError(`No unit with id :${id}`);
	}
	res.send(appliance)
}

export { createAppliance, updateAppliance, getAllAppliances, getSingleAppliance }