import User from "@/models/user";
import connectDB from "@/utils/connectDB";
import { UpdateUserDto } from "@/utils/dtos";
import { UpdateUserSchema } from "@/utils/validationSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method PATCH
 * @rout ~/api/user/profile
 * @description update name and email user data
 * @access private
 */
export async function PATCH(request: NextRequest) {
  try {
    //! check userid
    const userId = request.headers.get("x-user-id");
    if (!userId || !mongoose.Types.ObjectId.isValid(userId!))
      return NextResponse.json({ message: "Invalid User Id" }, { status: 400 });

    //! validation data input
    const { name, email } = (await request.json()) as UpdateUserDto;
    const validation = UpdateUserSchema.safeParse({ name, email });
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );

    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
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
