import Message from "../models/Message.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js"

const createMessage = async (req, res) => {
	const senderID = req.user.userID;
	// destructure request obj sent from front end
	const { recipient, body } = req.body

	// validate just in case (schema already validates)
	if (!recipient || !body) {
		throw new BadRequestError('please provide message body and recipient')
	}
	// get user id of recipient
	const recipientID = await User.findOne({ email: recipient })

	if (!recipientID) {
		throw new BadRequestError('Recipient can not be found')
	}
	console.log(recipientID);
	const message = { ...req.body, sender: senderID, recipient: recipientID}
	// create new request using Request model method
	const newMessage = await Message.create(message)

	// send response JSON to include appliance
	res.status(StatusCodes.CREATED)
	   .json({newMessage})
}

const getAllMessages = async (req, res) => {
	const messages = await Message.find({ recipient: req.user.userID})
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