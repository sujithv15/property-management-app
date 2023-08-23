import Request from "../models/Request.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js"

const createRequest = async (req, res) => {
	// destructure request obj sent from front end
	const { title, description, unit } = req.body

	if (!unit || !title || !description) {
		throw new BadRequestError('please provide request and unit')
	}

	// create new request using Request model method
	const newRequest = await Request.create({ unit, title, description, user:req.user.userID })

	// send response JSON to include appliance
	res.status(StatusCodes.CREATED)
	   .json({newRequest})
}

const getAllRequests = async (req, res, next) => {
	const requests = await Request.find()
	res.send(requests)
}

const getRequestDetails = async (req, res, next) => {
	const {id} = req.params
	const request = await Request.find({_id: id})
	if (!request) {
		throw new NotFoundError(`No request with id :${id}`);
	}
	res.send(request)
}

export { createRequest, getAllRequests, getRequestDetails }