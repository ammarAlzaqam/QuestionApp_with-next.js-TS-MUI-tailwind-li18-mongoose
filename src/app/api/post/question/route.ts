import Post from "@/models/post";
import connectDB from "@/utils/connectDB";
import { CreatePostDto } from "@/utils/dtos";
import { CreatePostSchema } from "@/utils/validationSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/post/question
 * @description create new question
 * @access private
 */
export async function POST(request: NextRequest) {
  try {
    //! check user id is valid
    const userId = request.headers.get("x-user-id");
    if (!mongoose.Types.ObjectId.isValid(userId!))
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });

    //! check data validation
    const { title, content, tags } = (await request.json()) as CreatePostDto;
    const validation = CreatePostSchema.safeParse({ title, content, tags });
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    await connectDB();
    const question = await Post.create({
      question: { title },
      content,
      tags,
      user: userId,
    });
    return NextResponse.json(
      { message: "Post Created Successfully", data: { id: question.id } },
      { status: 201 }
    );
  } catch (e) {
    console.error(`Error in create post api: ${e}`);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
