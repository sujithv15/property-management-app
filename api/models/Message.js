import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
	sender :{
		type: mongoose.Types.ObjectId,
		ref: 'User'
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
	read: {
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