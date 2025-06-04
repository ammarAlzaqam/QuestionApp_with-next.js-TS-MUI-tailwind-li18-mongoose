import Post, { PostDocument } from "@/models/post";
import connectDB from "@/utils/connectDB";
import { AcceptAnswerDto } from "@/utils/dtos";
import { AcceptAnswerSchema } from "@/utils/validationSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    //! User ID verification
    const userId = request.headers.get("x-user-id")!;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });

    //! req data validation
    const { question, answer } = (await request.json()) as AcceptAnswerDto;
    const validation = AcceptAnswerSchema.safeParse({ question, answer });
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );

    await connectDB();
    const post = (await Post.findOne({
      _id: question,
      parent: null,
    })) as PostDocument;
    //! Check if question exists
    if (!post)
      return NextResponse.json(
        { message: "The question does not exist." },
        { status: 404 }
      );
    //! Check if current user is the owner of the question
    if (post.user.toHexString() !== userId)
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 403 }
      );

    const qAnswer = await Post.findOneAndUpdate(
      { _id: answer, parent: question },
      { $set: { "answer.accepted": true } }
    );
    //! Check if answer exists
    if (!qAnswer)
      return NextResponse.json(
        { message: "The answer does not exist." },
        { status: 404 }
      );
    //! Make sure there is only one answer for this question.
    await Post.updateMany(
      { parent: question, _id: {$ne: answer} },
      { $set: { "answer.accepted": false } }
    );
    return NextResponse.json({
      message: "The answer has been successfully accepted.",
    });
  } catch (e) {
    console.error(`Error in accept post api: ${e}`);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
