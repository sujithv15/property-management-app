import mongoose from 'mongoose'

const UnitSchema = new mongoose.Schema( {
	unitID: {
		type: String,
		required: [true, "Please provide unit"]
	},
	image : {
		type: String,
	},
	street: {
		type: String,
		required: [true, "Please provide street"]
	},
	city: {
		type: String,
		required: [true, "Please provide city"]
	},
	state: {
		type: String,
		required: true
	},
	zip: {
		type: String,
		required: [true, "Please provide zip"]
	},
	occupied: {
		type: Boolean,
		default: false
	},
	tenantName: {
		type: String,
	},
	tenant: {
		type: mongoose.Types.ObjectId,
		ref: 'Tenant'
	},
	bedrooms : {
		type: Number,
	},
	bathrooms: {
		type: Number,
	},
	rent: {
		type: Number
	},
	fmrRent: {
		type: Number
	},
	appliances: [{
		type: mongoose.Types.ObjectId,
		ref: 'Appliance',
		default: []
	}],
	expenses: [{
		type: mongoose.Types.ObjectId,
		ref: 'Expense',
		default: []
	}],
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

export default mongoose.model('Unit', UnitSchema)