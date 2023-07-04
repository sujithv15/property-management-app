import mongoose from 'mongoose'

const PropertySchema = new mongoose.Schema({
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
			required: [true, "Please provide state"]
		},
		zip: {
			type: String,
			required: [true, "Please provide zip"]
		},
	},
	units : {
		type: [mongoose.Types.ObjectId],
		ref: 'Unit'
	},
})

export default mongoose.model('Property', PropertySchema)