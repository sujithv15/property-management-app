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
	const recipientUser = await User.findById(recipient)

	if (!recipientUser) {
		throw new BadRequestError('Recipient can not be found')
	}
	console.log(recipientUser);
	const message = { ...req.body, sender: senderID, recipient: recipientUser}
	// create new request using Request model method
	const newMessage = await Message.create(message)

	// send response JSON to include appliance
	res.status(StatusCodes.CREATED)
	   .json({newMessage})
}

const getAllMessages = async (req, res) => {
	const messages = await Message.find({ recipient: req.user.userID } || {sender: req.user.userID}).sort({ createdAt: -1 })
	res.status(StatusCodes.OK)
	   .json({messages})
}

const getSentMessages = async (req, res) => {
	const sentMessages = await Message.find({ sender: req.user.userID }).sort({ createdAt: -1 })
	res.status(StatusCodes.OK)
	   .json({sentMessages})
}

const toggleMessageRead = async (req,res) => {
	const message = await Message.findById(req.body)
	message.unread = false
	message.save()
	res.status(StatusCodes.OK).json({ msg: 'Success'})
}

const toggleMessageUnread = async (req,res) => {
	const message = await Message.findById(req.body)
	message.unread = true
	message.save()
	res.status(StatusCodes.OK).json({ msg: 'Success'})
}

const toggleMessageFlag = async (req,res) => {
	const message = await Message.findById(req.body)
	message.flag = !message.flag
	message.save()
	res.status(StatusCodes.OK).json({ msg: 'Success'})
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

export {
	createMessage,
	getAllMessages,
	getSentMessages,
	getMessage,
	toggleMessageRead,
	toggleMessageUnread,
	toggleMessageFlag,
}