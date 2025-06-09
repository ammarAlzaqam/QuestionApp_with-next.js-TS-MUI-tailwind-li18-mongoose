/**
 * @method POST
 * @route ~/api/auth/login
 * @description login
 * @access public
 */

import setAuthCookie from "@/libs/cookies";
import User, { UserDocument } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { LoginUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = (await request.json()) as LoginUserDto;
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const errorMsg = validation.error.issues[0].message;
      return NextResponse.json({ message: errorMsg }, { status: 400 });
    }

    await connectDB();

    //! check pass and @
    const user = (await User.findOne({ email }).select(
      "+password"
    )) as UserDocument;
    if (!user || !(await user?.comparePassword(password)))
      return NextResponse.json(
        {
          message: "Your email or password is not correct",
        },
        { status: 400 }
      );

    // set token in header cookie
    const token = await user.signJwt();
    const cookie = setAuthCookie(token);
    return NextResponse.json(
      { message: "You login successfully" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
