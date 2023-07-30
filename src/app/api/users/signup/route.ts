import { connect } from "@/db/db";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";



connect();


export async function POST(req: NextRequest) { 
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    // run validations

    console.log(reqBody);

    // check if user exists
    const user = await User.findOne({ email })
    
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // has password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save();
    console.log(savedUser);

    await sendEmail({ email, emailType: 'VERIFY', userID: savedUser._id })

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    })
  } catch (error: any) {
    return NextResponse.json({error: error.message }, { status: 500});
  }
}