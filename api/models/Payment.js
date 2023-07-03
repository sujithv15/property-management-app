import mongoose from 'mongoose'
import validator from 'validator'

const PaymentSchema = new mongoose.Schema({
	payTo: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	dateDue: {
		type: String,
	},
	datePaid : {
		type: String,
	},
	balance: {
		type: String,
	},
	status: {
		type: String,
	},
	comments: {
		type: String,
	}
})

export default mongoose.model('Payment', PaymentSchema)