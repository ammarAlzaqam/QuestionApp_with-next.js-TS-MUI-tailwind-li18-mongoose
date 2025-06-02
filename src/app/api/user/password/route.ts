import User, { UserDocument } from "@/models/user";
import connectDB from "@/utils/connectDB";
import { UpdateUserPassDto } from "@/utils/dtos";
import { UpdateUserPassSchema } from "@/utils/validationSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method PATCH
 * @rout ~/api/user/password
 * @description update password user data
 * @access private
 */
export async function PATCH(request: NextRequest) {
  try {
    //! check userid
    const userId = request.headers.get("x-user-id");
    if (!userId || !mongoose.Types.ObjectId.isValid(userId!))
      return NextResponse.json({ message: "Invalid User Id" }, { status: 400 });

    //! validation data input
    const { password, newPassword } =
      (await request.json()) as UpdateUserPassDto;
    const validation = UpdateUserPassSchema.safeParse({
      password,
      newPassword,
    });
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );

    await connectDB();
    const user = (await User.findById(userId).select(
      "+password"
    )) as UserDocument;

    //! Check if password is change
    if (password === newPassword)
      return NextResponse.json(
        { message: "Password didn't change" },
        { status: 400 }
      );

    //! Check if correct password
    if (!(await user?.comparePassword(password)))
      return NextResponse.json(
        { message: "Password not correct" },
        { status: 400 }
      );

    user.password = newPassword;
    await user.save();
    return NextResponse.json(
      { message: "User Password updated successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error(`Error in Profile Route: ${e}`);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
