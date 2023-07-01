import Property from "../models/Property.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js"

const createProperty = async (req, res, next) => {
	// create new property using Property Model, letting mongoose take care of validation
	const newProperty = await Property.create(req.body)

	// send response JSON to include appliance
	res.status(StatusCodes.CREATED).json({newProperty})
}

const getAllProperties = async (req, res, next) => {
	const properties = await Property.find()
	res.status(StatusCodes.OK).json(properties)
}

const getPropertyDetails = async (req, res, next) => {
	const {id} = req.params
	const property = await Property.find({_id: id})
	if (!property) {
		throw new NotFoundError(`No property with id :${id}`);
	}
	res.status(StatusCodes.OK).json(property)
}

export { createProperty, getAllProperties, getPropertyDetails }