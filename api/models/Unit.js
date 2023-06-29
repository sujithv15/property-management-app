import mongoose from 'mongoose'

const UnitSchema = new mongoose.Schema( {
	status: {
		type: String,
		enum: ["vaccant", "occupied"]
	},
	tenant: {
		type: mongoose.Types.ObjectId,
		ref: 'Tenant',
	},
	unitID: {
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
		type: [mongoose.Types.ObjectId],
		ref: 'Appliance'
	}
})

export default mongoose.model('Unit', UnitSchema)