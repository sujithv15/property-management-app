import mongoose from 'mongoose'
import validator from "validator";

const MessageSchema = new mongoose.Schema({
	sender :{
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	senderName: {
		type: String
	},
	senderEmail: {
		type: String,
		validate: {
			validator: validator.isEmail,
			message: (props) => `${props.value} is not a valid email. Please provide valid email`,
		},
		lowercase: true
	},
	recipient: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	unit: {
		type: mongoose.Types.ObjectId,
		ref: 'Unit',
	},
	subject: {
		type: String
	},
	body: {
		type: String
	},
	flag: {
		type: Boolean
	},
	unread: {
		type: Boolean
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	}
}, {timestamps: true})

export default mongoose.model('Message', MessageSchema)