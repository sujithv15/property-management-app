import Request from "../models/Request.js";
import {StatusCodes} from "http-status-codes";
import {BadRequestError} from "../errors"

const createRequest = async (req, res, next) => {
	// destructure request obj sent from front end
	const { unit, request, urgent, completed } = req.body

	if (!unit || !request) {
		throw new BadRequestError('please provide request and unit')
	}

	// create new request using Request model method
	const newRequest = await Request.create({ unit, request, urgent, completed })

	// send response JSON to include appliance
	res.status(StatusCodes.CREATED)
	   .json({newRequest})
}

const getAllRequests = async (req, res, next) => {

}

const getRequestDetails = async (req, res, next) => {

}

export { createRequest, getAllRequests, getRequestDetails }