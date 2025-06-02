/**
 * @method POST
 * @route ~/api/auth/register
 * @description Crate New User
 * @access public
 */

import setAuthCookie from "@/libs/cookies";
import User, { UserDocument } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { RegisterUserDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;

    //! validation for {username, email, password}
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0].message;
      return NextResponse.json({ message: errorMsg }, { status: 400 });
    }

    await connectDB();
    //! check unique email
    const user = await User.findOne({ email: body.email });
    if (user)
      return NextResponse.json(
        { message: "This User already registered" },
        { status: 400 } // Bad Request
      );

    //TODO>> add new user in DB
    const newUser = (await User.create(body)) as UserDocument;
    const token = await newUser.signJwt();
    const cookie = setAuthCookie(token);
    return NextResponse.json(
      { message: "User Created Successfully" },
      { status: 201, headers: { "Set-Cookie": cookie } }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
