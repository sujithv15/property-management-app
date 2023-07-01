import mongoose from 'mongoose'
import validator from 'validator'

const RepairSchema = new mongoose.Schema({
	date: {
		type: String,
		required: true
	},
	cost: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		default: false,
		required: true
	},
	repairedBy: {
		type: String,
		required: true
	}
})

export default mongoose.model('Repair', RepairSchema)