import Post from "@/models/post";
import connectDB from "@/utils/connectDB";
import { AddVoteDto } from "@/utils/dtos";
import { AddVoteSchema } from "@/utils/validationSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    //! User ID verification
    const userId = request.headers.get("x-user-id")!; //? (!) check userId not find in middleware
    if (!mongoose.Types.ObjectId.isValid(userId))
      return NextResponse.json({ message: "Invalid User Id" }, { status: 400 });

    //! Request Data validation
    const { postId, voteType } = (await request.json()) as AddVoteDto;
    const validation = AddVoteSchema.safeParse({ postId, voteType });
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );

    await connectDB();
    await Post.vote(postId, { userId, voteType });
    return NextResponse.json(
      { message: "Voted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error(`Error in vote api: ${e}`);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
