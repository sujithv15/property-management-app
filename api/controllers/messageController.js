import Message from "../models/Message.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors"

const createMessage = async (req, res) => {
	// destructure request obj sent from front end
	const { sender, recipient, body,  } = req.body

	if (!sender || !recipient || !body) {
		throw new BadRequestError('please provide message body and receipient')
	}

	// create new request using Request model method
	const newMessage = await Message.create(req.body)

	// send response JSON to include appliance
	res.status(StatusCodes.CREATED)
	   .json({newMessage})
}

const getAllMessages = async (req, res) => {
	const messages = await Message.find()
	res.status(StatusCodes.OK)
	   .json({messages})
}

const getMessage = async (req, res) => {
	const {id} = req.params
	const message = await Message.find({_id: id})
	if (!message) {
		throw new NotFoundError(`No message with id :${id}`);
	}
	res.status(StatusCodes.OK)
	   .json({message})
}

export { createMessage, getAllMessages, getMessage }