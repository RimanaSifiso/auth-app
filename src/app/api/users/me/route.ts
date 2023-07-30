import { getTokenData } from '@/helpers/getTokenData'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/UserModel'
import { connect } from '@/db/db'

connect()

export async function GET(request: NextRequest) {
	try {
		const userID = await getTokenData(request)
		const user = await User.findById(userID).select('-password')
		return NextResponse.json({
			message: 'User found',
			data: user,
		})
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 400 }
		)
	}
}
