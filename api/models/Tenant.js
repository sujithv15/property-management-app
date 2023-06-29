import mongoose from 'mongoose'
import validator from 'validator'

const TenantSchema = new mongoose.Schema({
	unit: {
		type: mongoose.Types.ObjectId,
		ref: 'Unit',
		required: [true, 'Please provide unit'],
	},
	lastName: {
		type: String,
		minlength: 3,
		maxlength: 20,
		trim: true,
		default: '',
	},
	firstName: {
		type: String,
		trim: true,
		maxlength: 20,
		default: '',
	},
	address: {
		type: String,
	},
	email: {
		type: String,
		validate: {
			validator: validator.isEmail,
			message: 'Please provide a valid email',
		},
		unique: true,
	},
	phone: {
		type: Number,
		trim: true,
		maxlength: 20,
		unique: true,
	},
	rent: {
		type: Number,
		required: true
	},
	rentTenant: {
		type: Number
	},
	rentAssisted: {
		type: Number
	},
	balance: {
		type: Number
	},
	housingAgency: {
		type: String
	},
	agentName: {
		type: String
	},
	agentPhone : {
		type: String
	},
	agentEmail: {
		type: String,
		validate: {
			validator: validator.isEmail,
			message: 'please provide valid email'
		}
	}


})

export default mongoose.model('Tenant', TenantSchema)