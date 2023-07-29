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
		enum: ['refrigerator', 'microwave', 'stove', 'dishwasher', 'air-conditioner', 'water heater', 'washer', 'dryer'],
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
		type: String
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

// add created appliance to appliances array in Unit obj
ApplianceSchema.pre('save', async function() {
	const applianceUnit = await Unit.findById(this.unit).populate('appliances')
	if (!applianceUnit) {
		throw new NotFoundError(`No unit with ${this.unit} number`);
	}
	if (!applianceUnit.appliances) {
		applianceUnit.appliances = [this]
	}
	else {
		applianceUnit.appliances.push(this)
	}
	applianceUnit.save()

	console.log('appliance saved to unit');
})

export default mongoose.model('Appliance', ApplianceSchema)
