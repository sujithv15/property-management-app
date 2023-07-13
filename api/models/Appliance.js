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
	warranty: {
		type: String
	},
	receipt: {
		type: String
	},
	payments: {
		type: mongoose.Types.ObjectId,
		ref: 'Payment'
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

export default mongoose.model('Appliance', ApplianceSchema)
