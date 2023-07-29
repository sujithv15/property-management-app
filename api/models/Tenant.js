import mongoose from 'mongoose'
import validator from 'validator'
import Unit from "./Unit.js";
import { NotFoundError } from "../errors/index.js";

const TenantSchema = new mongoose.Schema({
	unit: {
		type: mongoose.Types.ObjectId,
		ref: 'Unit',
		required: [true, 'Please provide unit'],
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	lastName: {
		type: String,
		minlength: 3,
		maxlength: 20,
		trim: true,
		default: '',
		immutable: true
	},
	firstName: {
		type: String,
		trim: true,
		maxlength: 20,
		default: '',
	},
	email: {
		type: String,
		validate: {
			validator: validator.isEmail,
			message: 'Please provide a valid email',
		},
		unique: true,
	},
	phone: {
		type: String,
		trim: true,
		maxlength: 20,
		unique: true,
	},
	rent: {
		type: Number,
	},
	balance: {
		type: Number,
		default: 0
	},
	isAssisted: {
		type: Boolean,
		default: false
	},
	rentAssistance: {
		tenantPortion: {
			type: Number
		},
		assistedPortion: {
			type: Number
		},
		agent: {
			name: { type: String },
			agency: { type: String },
			phone: { type: String },
			email: { type: String}
		}
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

// when new tenant is created, assign appropriate unit to created tenant
TenantSchema.pre('save', async function() {
	const tenantUnit = await Unit.findById(this.unit)
	if (!tenantUnit) {
		throw new NotFoundError(`No unit with ${this.unit} number`);
	}
	await Unit.findByIdAndUpdate(tenantUnit._id, { tenant: this._id })
	console.log('tenant saved to unit');
})

export default mongoose.model('Tenant', TenantSchema)