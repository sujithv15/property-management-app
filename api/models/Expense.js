import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Miscellaneous', 'Insurance', 'Taxes', 'Maintenance', 'Repairs'],
		required: true
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
		type: String,
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

export default mongoose.model('Expense', ExpenseSchema)