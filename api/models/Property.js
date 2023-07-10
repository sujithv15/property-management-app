import mongoose from 'mongoose'

const PropertySchema = new mongoose.Schema({
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
		required: [true, "Please provide state"]
	},
	zip: {
		type: String,
		required: [true, "Please provide zip"]
	},
	units : {
		type: [mongoose.Types.ObjectId],
		ref: 'Unit'
	},
	createdAt: {
		type: Date,
		default: Date.now()
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
	}
})

export default mongoose.model('Property', PropertySchema)