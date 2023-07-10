import Property from "../models/Property.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js"

const createProperty = async (req, res) => {
	// create new property using Property Model, letting mongoose take care of validation
	console.log(req.body);
	const newProperty = await Property.create(req.body)
	// send response JSON to include newly created property
	res.status(StatusCodes.CREATED).json({newProperty})
}

// get all properties, and populate units in each property with tenant information
const getAllProperties = async (req, res) => {
	const properties = await Property.find()
	                                 .populate({
		                                 path: "units",
		                                 populate: {
														path: "tenant",
		                                 }
	                                 })

	res.status(StatusCodes.OK).json({properties})
}

// could possibly handle this with front end?
const getPropertyDetails = async (req, res) => {
	const {id} = req.params
	const property = await Property.findById(id).populate("units").populate("tenants")
	if (!property) {
		throw new NotFoundError(`No property with id :${id}`);
	}
	res.status(StatusCodes.OK).json({property})
}


const updateProperty = async (req, res) => {
	const { id } = req.params
	const property = await Property.findById(id)
	if (!property) {
		throw new NotFoundError(`No property with id :${id}`);
	}
	await Property.findByIdAndUpdate(id, req.body)
	res.status(StatusCodes.OK).json({property})
}

const deleteProperty = async (req, res) => {
	const { id } = req.params
	const property = await Property.findById(id)
	if (!property) {
		throw new NotFoundError(`No property with id :${id}`);
	}
	await Property.findByIdAndDelete(id)
	res.status(StatusCodes.OK).json({property})
}

export { createProperty, getAllProperties, getPropertyDetails, updateProperty, deleteProperty }