import Post from "@/models/post";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * @method GET
 * @route ~/api/post/[id]
 * @description get single post with id
 * @access public
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id: postId } = await params;

    await connectDB();

    const question = await Post.findById(postId)
      .populate("user", "name")
      .populate("tags", "name slug");

    const answers = await Post.find({ parent: postId }).populate(
      "user",
      "name"
    );

    return NextResponse.json(
      { ...question?.toJSON(), answers },
      { status: 200 }
    );
  } catch (e) {
    console.error(`Error in get single post api: ${e}`);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
