const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailHeader = '<header>Email Header</header>';
const emailFooter = '<footer><p>Thank you to using Meta form</p></footer>';

exports.sendEmail = async ({ to, from, subject, emailBody }) => {
	const html = emailHeader + emailBody + emailFooter;
	const msg = {
		to,
		from,
		subject,
		html,
	};

	try {
		await sgMail.send(msg);
		console.log('email sent');
		return true;
	} catch (error) {
		throw new Error(error);
	}
};

exports.emailTemplate = {
	resetPassword: (url) => `
<article>
	<p>Hi Customer,</p>
	<p>Please click to reset your password <a href="${url}">Reset your password</a></p>
</article>
	`,
};
