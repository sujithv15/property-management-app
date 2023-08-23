import Request from "../models/Request.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js"

const editRequest = async (req, res) => {

}

const getAllRequests = async (req, res) => {
	const requests = await Request.find()
	res.status(StatusCodes.OK).json({ requests })
}

const getRequestDetails = async (req, res) => {
	const {id} = req.params
	const request = await Request.find({_id: id})
	if (!request) {
		throw new NotFoundError(`No request with id :${id}`);
	}
	res.send(request)
}

export { editRequest, getAllRequests, getRequestDetails }