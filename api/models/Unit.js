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
	status: {
		type: String,
		enum: ["vacant", "occupied"],
		required: true
	},
	tenant: {
		type: mongoose.Types.ObjectId,
		ref: 'Tenant'
	},
	unitID: {
		type: String
	},
	rent: {
		type: mongoose.Types.ObjectId,
		ref: "Rent"
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