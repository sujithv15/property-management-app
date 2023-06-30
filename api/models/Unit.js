import mongoose from 'mongoose'

const UnitSchema = new mongoose.Schema( {
	status: {
		type: String,
		enum: ["vacant", "occupied"],
		required: true
	},
	tenant: {
		type: mongoose.Types.ObjectId,
		ref: 'Tenant',
	},
	unitID: {
		type: String,
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
		type: String,
		required: true
	},
	rent: {
		type: Number
	},
	fmrRent: {
		type: Number,
		required: true
	},
	appliances: {
		type: [mongoose.Types.ObjectId],
		ref: 'Appliance'
	}
})

export default mongoose.model('Unit', UnitSchema)