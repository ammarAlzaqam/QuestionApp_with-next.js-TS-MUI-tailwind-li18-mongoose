import connectDB from "@/utils/connectDB";
import Post, { PostDocument } from "@/models/post";
import { AddAnswerDto } from "@/utils/dtos";
import { AddAnswerSchema } from "@/utils/validationSchema";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/post/answer
 * @description add answer for question
 * @access private
 */
export async function POST(request: NextRequest) {
  try {
    //! User ID verification
    const userId = request.headers.get("x-user-id");
    if (!mongoose.Types.ObjectId.isValid(userId!))
      return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });

    //! Req Data validation
    const { content, question: questionId } =
      (await request.json()) as AddAnswerDto;
    const validation = AddAnswerSchema.safeParse({
      content,
      question: questionId,
    });
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );

    await connectDB();

    //! Check if answer exists in mongodb
    if (!mongoose.Types.ObjectId.isValid(questionId))
      return NextResponse.json(
        { message: "Answer not found" },
        { status: 400 }
      );

    const question = (await Post.findByIdAndUpdate(questionId, {
      $inc: { "question.answersCount": 1 },
    })) as PostDocument;
    //! Check if the Question exists
    if (!question)
      return NextResponse.json(
        { message: "Question not found" },
        { status: 400 }
      );

    await Post.create({
      parent: questionId,
      content,
      user: userId,
    });
    return NextResponse.json(
      { message: "Answer has been added successfully" },
      { status: 201 }
    );
  } catch (e) {
    console.error(`Error in Add answer api ${e}`);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
