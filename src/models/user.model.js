const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		index: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false,
	},
	resetPasswordToken: {
		type: String,
	},
	resetPasswordExpires: {
		type: Date,
		default: undefined,
	},
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

UserSchema.methods.createResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	this.resetPasswordExpires = Date.now() + 5 * 60 * 1000;

	return resetToken;
};

const User = model('User', UserSchema);

module.exports = User;
