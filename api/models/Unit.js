import mongoose from 'mongoose'

const UnitSchema = new mongoose.Schema( {
	property: {
		type: mongoose.Types.ObjectId,
		ref: 'Property'
	},
	address : {
		street: {
			type: String,
			required: [true, "Please provide street"]
		},
		streetOptions: {
			type: String
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
	appliances: {
		type: [mongoose.Types.ObjectId],
		ref: 'Appliance'
	},
	repairs: {
		type: [mongoose.Types.ObjectId],
		ref: 'Repair'
	}
})

export default mongoose.model('Unit', UnitSchema)