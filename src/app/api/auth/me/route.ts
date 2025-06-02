import User, { UserDocument } from "@/models/user";
import connectDB from "@/utils/connectDB";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/auth/me
 * @description get user data
 * @access private
 */

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId || !mongoose.Types.ObjectId.isValid(userId!))
      return NextResponse.json({ message: "Invalid user Id" }, { status: 400 });

    await connectDB();
    const user = (await User.findById(userId)) as UserDocument;
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (e) {
    console.error(`Error in GET user route: ${e}`);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
