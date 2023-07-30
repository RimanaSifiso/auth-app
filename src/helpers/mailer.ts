import nodemailer from 'nodemailer'
import User from '@/models/UserModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userID }: any) => {
	try {
		const hashedToken = await bcryptjs.hash(userID.toString(), 10)

		const user = await User.findById(userID)

		if (emailType === 'VERIFY') {
			await User.findByIdAndUpdate(userID, {
				verificationToken: hashedToken,
				verificationTokenExpiry: Date.now() + 3600000,
			})
		} else if (emailType === 'RESET') {
			await User.findByIdAndUpdate(userID, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			})
		}

		// create a transport

		const transport = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: '8ee84ceff72e82',
				pass: '5b0f88704a1b55',

				// add these to .env file
			},
		})

		const mailOptions = {
			from: 'noreply@schoolmate.com',
			to: email,
			subject:
				emailType === 'VERIFY'
					? `Hello ${user.username}, please verify your email:)`
					: `Hello ${user.username}, reset your password`,
			html: `<p>Dear ${user.username}, <p>Click the link below to ${
				emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
			} <a href="${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}">Click here</a>`,
    }
    
    const mailResponse = await transport.sendMail(mailOptions);
    return mailOptions;
	} catch (error: any) {
		throw new Error(error.message)
	}
}
