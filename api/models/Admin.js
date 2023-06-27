import mongoose from 'mongoose'
import validator from "validator";
import  bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const AdminSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'please provide email'],
		validate: {
			validator: validator.isEmail,
			message: 'please provide valid email',
		},
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'please provide password'],
		minLength: 6,
		select: false
	}
})

// hash method on admin to hash admin.password
AdminSchema.pre('save', async function() {
	if (!this.isModified('password')) return
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

// create JWT token
AdminSchema.methods.createJWT = function () {
	return jwt.sign(
		{ adminID: this._id },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	)
}

// create method on user to compare entered password to user.password
AdminSchema.methods.comparePassword = async function(candidatePassword) {
	console.log(candidatePassword)
	console.log(this.password)
	return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('Admin', AdminSchema)