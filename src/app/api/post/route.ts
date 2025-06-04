import Post from "@/models/post";
import connectDB from "@/utils/connectDB";
import { POSTS_PER_PAGE } from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/post?pageNumber&sort
 * @description get posts by pageNumber(20 post) & sort
 * @access public
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    const sort = request.nextUrl.searchParams.get("sort") || "-1";
    const tag = request.nextUrl.searchParams.get("tag") || "";

    await connectDB();
    const { posts, pages } = await Post.pagination(
      parseInt(pageNumber),
      parseInt(sort),
      POSTS_PER_PAGE,
      tag
    );

    return NextResponse.json({ posts, pages }, { status: 200 });
  } catch (e) {
    console.error(`Error in get posts pagination api: ${e}`);
    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    );
  }
}
