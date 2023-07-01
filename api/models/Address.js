import mongoose from 'mongoose'
import validator from 'validator'

const AddressSchema = new mongoose.Schema({
	street: {
		type: String,
		required: true
	},
	streetLine2: {
		type: String
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	zip: {
		type: String,
		required: true
	},


})

export default mongoose.model('Address', AddressSchema)