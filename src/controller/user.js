const { randomBytes } = require('crypto');
const User = require('../models/user.model');
const emailService = require('../utils/emailService');

exports.forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;

		const existUser = await User.findOne({ email });

		if (!existUser) {
			return res.status(400).send('This User is not exist');
		}

		const resetToken = existUser.createResetPasswordToken();

		const resetUrl = `http://metaform.com/resetPassword?resetToken=${resetToken}`;

		const emailBody = emailService.emailTemplate.resetPassword(resetUrl);

		const sendResetPasswordEmail = await emailService.sendEmail({
			to: existUser.email,
			from: 'metaFormTestEmail@gmail.com',
			subject: 'Reset Email',
			emailBody,
		});

		if (!sendResetPasswordEmail) {
			throw new Error('fail to send reset email');
		}

		return res.status(200).json({
			message: `Reset Password email sent to ${existUser.email}`,
		});
	} catch (error) {
		throw new Error(error);
	}
};

exports.resetPassword = async (req, res) => {
	const { password, resetToken } = req.body;

	const existUser = await User.findOne({
		resetPasswordToken: resetToken,
		resetPasswordExpires: { $gt: new Date(Date.now()) },
	});

	if (!existUser) {
		throw new Error('USer not found');
	}

	await User.findOneAndUpdate(
		{ email: existUser.email },
		{
			$set: {
				password,
				resetPasswordToken: '',
			},
			$unset: {
				resetPasswordExpires: '',
			},
		}
	);

	return res.status(200).send('Reset Pawword success');
};

//display all
exports.index = (req, res) => {
	console.log(123);
	return res.status(200).send('Success');
};
//update one user
exports.update = (req, res) => {
	return res.status(200).send('Failed');
};

//del one user
exports.destroy = (req, res) => {
	return res.status(200).send('Failed');
};

//store one user
exports.store = async (req, res) => {
	const { email, firstName, lastName, password } = req.body;

	const user = await User.create({ email, firstName, lastName, password });

	return res.status(200).json(user);
};

//display one user
exports.show = (req, res) => {
	return res.status(200).send('Failed');
};
