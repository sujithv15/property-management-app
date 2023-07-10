import mongoose from 'mongoose'

const UnitSchema = new mongoose.Schema( {
	propertyUnit: {
		type: String,
		required: [true, "Please provide unit"]
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
	isPrimary: {
		type: Boolean,
		required: [true, "Please select if this will be the primary unit"]
	},
	tenant: {
		type: mongoose.Types.ObjectId,
		ref: 'Tenant'
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
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
	},
	insurance: {
		company: {
			type: String
		},
		premium: {
			type: Number
		},
		details: {
			type: String
		}
	},
	mortgage: {
		type: {}
	},
	association: {
		type: String
	},
	taxes: {
		type: [String]
	},
	maintenance: {
		type: {}
	},
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