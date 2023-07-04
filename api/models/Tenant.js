import mongoose from 'mongoose'
import validator from 'validator'

const TenantSchema = new mongoose.Schema({
	property: {
		type: mongoose.Types.ObjectId,
		ref: 'Property',
		required: [true, 'Please provide property'],
	},
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
		immutable: true
	},
	firstName: {
		type: String,
		trim: true,
		maxlength: 20,
		default: '',
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
		type: String,
		trim: true,
		maxlength: 20,
		unique: true,
	},
	rent: {
		type: Number,
		required: true,
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
			name: { type: String },
			agency: { type: String },
			phone: { type: String },
			email: { type: String}
		}
	}
})

export default mongoose.model('Tenant', TenantSchema)