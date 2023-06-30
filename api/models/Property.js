import mongoose from 'mongoose'
import validator from 'validator'

const PropertySchema = new mongoose.Schema({
	name: {
		type: String
	},
	street: {
		type: Number,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	state : {
		type: String,
		required: true,
	},
	zip: {
		type: String,
		required: true,
	},
	numUnits: {
		type: String,
		required: true,
	},
	unitTypes: {
		type: [String],
		required: true,
	}
})

export default mongoose.model('Property', PropertySchema)