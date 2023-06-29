import Appliance from "../models/Appliance.js";
import {StatusCodes} from "http-status-codes";

const createAppliance = async (req, res, next) => {
	const newAppliance = new Appliance(req.body)

	try {
		const savedAppliance = await newAppliance.save()
		res.status(StatusCodes.CREATED).json(savedAppliance)
	} catch (error) {
		console.log(error);
		next(error)
	}
}
const updateAppliance = async (req, res, next) => {
	try {
		const updatedAppliance = await Appliance.findByIdAndUpdate(
			req.params.id,
			{ $set, req:body },
			{ new: true }
		)
		res.status(StatusCodes.OK).json(updatedAppliance)
	} catch (error) {
		console.log(error);
		next(error)
	}
}

const getAllAppliances = async (req, res, next) => {
	res.send('getAllAppliances')
}

const getSingleAppliance = async (req, res, next) => {
	res.send('getSingleAppliance')
}

export { createAppliance, updateAppliance, getAllAppliances, getSingleAppliance }