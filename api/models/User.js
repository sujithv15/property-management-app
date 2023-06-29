import mongoose from 'mongoose'
import validator from "validator";
import  bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'please provide name'],
		minLength: 2,
		maxLength: 40,
		trim: true,
	},
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
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
})

// hash method on user to hash user.password
UserSchema.pre('save', async function() {
	if (!this.isModified('password')) return
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

// create JWT token
UserSchema.methods.createJWT = function () {
	return jwt.sign(
		{ userID: this._id, isAdmin: this.isAdmin },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	)
}

// create method on user to compare entered password to user.password
UserSchema.methods.comparePassword = async function(candidatePassword) {
	console.log(candidatePassword)
	console.log(this.password)
	return await bcrypt.compare(candidatePassword, this.password)



}
export default mongoose.model('User', UserSchema)