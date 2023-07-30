import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = NextResponse.json({
      message: "Logout successful", 
      success: "True"
    })

    // can we get user data from the cookies object?

    res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
    
    return res;
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{
				status: 500,
			}
		)
	}
}
