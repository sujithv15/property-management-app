import mongoose from 'mongoose'

const MortgageSchema = new mongoose.Schema({
	bank: {
		type: String
	},
	loanAmount: {
		type: Number
	},
	balance: {
		type: Number
	},
	interest: {
		type: Number
	},
	payment: {
		type: Number
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

export default mongoose.model('Mortgage', MortgageSchema)