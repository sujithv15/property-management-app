import mongoose from 'mongoose'

const ApplianceSchema = new mongoose.Schema({
	unit: {
		type: mongoose.Types.ObjectId,
		ref: 'unit'
	},
	appliance: {
		type: String,
		enum: ['refrigerator', 'microwave', 'stove', 'dishwasher', 'air-conditioner', 'water heater', 'washer', 'dryer'],
		required: true
	},
	datePurchased: {
		type: String,
		required: true,
	},
	repairs: {
		type: mongoose.Types.ObjectId,
		ref: 'Repair'
	},
	warranty: {
		type: String
	},
	receipt: {
		type: String
	},
})

export default mongoose.model('Appliance', ApplianceSchema)
