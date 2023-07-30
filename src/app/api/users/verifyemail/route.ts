import { connect } from '@/db/db'
import { sendEmail } from '@/helpers/mailer'
import User from '@/models/UserModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json()
		const { token } = requestBody
		console.log(token)

		const user = await User.findOne({
			verificationToken: token,
			verificationTokenExpiry: { $gt: Date.now() },
		})

		if (!user) {
			return NextResponse.json(
				{
					error: 'Invalid token',
				},
				{ status: 400 }
			)
    }
    
    console.log(user);
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();


    // send verification email


    return NextResponse.json({
      message: "Email verified",
      success: true,
    })

	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
