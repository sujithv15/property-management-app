import mongoose from 'mongoose'

const ApplianceSchema = new mongoose.Schema({
	appliance: {
		type: String,
		enum: ['refrigerator', 'microwave', 'stove', 'dishwasher'],
		required: true
	},
	datePurchased: {
		type: String,
		required: true,
	},
	repairs: {
		type: [String],
	},
	warranty: {
		type: String
	},
	receipt: {
		type: String
	}
})

export default mongoose.model('Appliance', ApplianceSchema)
