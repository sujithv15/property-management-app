import mongoose from 'mongoose'

const UnitSchema = new mongoose.Schema( {
	tenant: {
		type: mongoose.Types.ObjectId,
		ref: 'Tenant',
	},
	unitNumber: {
		type: Number,
		required: true
	},
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
		type: Number,
		required: true
	},
	rent: {
		type: Number
	},
	fmrRent: {
		type: Number
	},
	appliances: {
		type: Array
	}
})

export default mongoose.model('Unit', UnitSchema)