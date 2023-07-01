import mongoose from 'mongoose'
import validator from 'validator'

const RentSchema = new mongoose.Schema({
	amount: {
		type: Number,
		required: true
	},
	balance: {
		type: Number,
		default: 0
	},
	isAssisted: {
		type: Boolean,
		default: false
	},
	rentAssistance: {
		tenantPortion: {
			type: Number
		},
		assistedPortion: {
			type: Number
		},
		agent: {
			type: mongoose.Types.ObjectId,
			ref: 'HousingAgent',
		},
	},
})

export default mongoose.model('Rent', RentSchema)