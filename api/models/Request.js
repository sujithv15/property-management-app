import mongoose from 'mongoose'
import validator from 'validator'

const RequestSchema = new mongoose.Schema({
	unit: {
		type: mongoose.Types.ObjectId,
		ref: 'Unit',
	},
	tenant: {
		type: mongoose.Types.ObjectId,
		ref: 'Tenant',
	},

	email: {
		type: String,
		validate: {
			validator: validator.isEmail,
			message: 'Please provide a valid email',
		},
		unique: true,
	},
	request: {
		type: String
	},
	urgent: {
		type: Boolean
	}
})

export default mongoose.model('Request', RequestSchema)