import mongoose from 'mongoose'
import validator from 'validator'

const HousingAgent = new mongoose.Schema({
	lastName: {
		type: String,
		required: true
	},
	firstName: {
		type: String
	},
	housingAuthority: {
		type: String,
		required: true
	},
	address: {
		streetName: {
			type: String,
			required: true
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
	},
	phone: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: validator.isEmail,
			message: 'please provide valid email'
		}
	}
})

export default mongoose.model('HousingAgent', HousingAgent)