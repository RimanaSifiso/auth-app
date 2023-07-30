import { connect } from '@/db/db'
import User from '@/models/UserModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect() // connect to db

export async function POST(req: NextRequest) {
	try {
		const reqBody = await req.json()
		const { email, password } = reqBody
		console.log(reqBody)

		// check if user exists
		const user = await User.findOne({ email })
		if (!user) {
			return NextResponse.json(
				{ error: 'User does not exist' },
				{ status: 400 }
			)
		}

		// check is password is correct
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) {
			return NextResponse.json({ error: 'Password incorrect' }, { status: 400 })
		}
		// create token data

		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		}

		const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: '1d',
		})

		const res = NextResponse.json({
			message: 'Login Successful',
			success: true,
		})

		res.cookies.set('token', token, { httpOnly: true })

		return res
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
