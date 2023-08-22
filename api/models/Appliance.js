import mongoose from 'mongoose'
import Unit from "./Unit.js";
import { NotFoundError } from "../errors/index.js";

const ApplianceSchema = new mongoose.Schema({
	unit: {
		type: mongoose.Types.ObjectId,
		ref: 'unit'
	},
	appliance: {
		type: String,
		enum: ['Refrigerator', 'Microwave', 'Stove', 'Dishwasher', 'Air-Conditioner', 'Water Heater', 'Washer', 'Dryer'],
		required: true
	},
	datePurchased: {
		type: Date,
		required: true,
	},
	warranty: {
		type: String
	},
	receipt: {
		type: String,
	},
	link: {
		type: String,
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
