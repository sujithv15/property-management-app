import Property from "../models/Property.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js"

const createProperty = async (req, res, next) => {
	// destructure request obj sent from front end
	const { name, street, city, state, zip, numUnits, unitTypes } = req.body

	if (!street || !city || !state || !zip) {
		throw new BadRequestError('please provide address')
	}

	// create new request using Request model method
	const newProperty = await Property.create({ name, street, city, state, zip, numUnits, unitTypes })

	// send response JSON to include appliance
	res.status(StatusCodes.CREATED)
	   .json({newProperty})
}

const getAllProperties = async (req, res, next) => {
	const properties = await Request.find()
	res.send(properties)
}

const getPropertyDetails = async (req, res, next) => {
	const {id} = req.params
	const property = await Property.find({_id: id})
	if (!property) {
		throw new NotFoundError(`No property with id :${id}`);
	}
	res.send(property)
}

export { createProperty, getAllProperties, getPropertyDetails }