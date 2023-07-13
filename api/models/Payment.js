import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['insurance', 'taxes', 'regular maintenance', 'repairs', 'other'],
		required: true
	},
	unit: {
		type: mongoose.Types.ObjectId,
		ref: "Unit"
	},
	description: {
		type: String,
	},
	payTo: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	recurring: {
		type: Boolean,
	},
	dateDue: {
		type: Date,
	},
	datePaid : {
		type: Date,
	},
	balance: {
		type: Number,
	},
	status: {
		type: String,
		enum: ['paid', 'unpaid', 'pending']
	},
	comments: {
		type: String,
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
}, { timestamps: true })

export default mongoose.model('Payment', PaymentSchema)