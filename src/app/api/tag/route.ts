import Tag from "@/models/tag";
import connectDB from "@/utils/connectDB";
import { CreateTagDto } from "@/utils/dtos";
import { CreateTagSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @route ~/api/tag
 * @description add new tag
 * @access public
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateTagDto;
    //! check validation inputs
    const validation = CreateTagSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );

    await connectDB();

    //* if no slug provide, slug depended on tag name
    if (!body.slug) {
      const tag = await Tag.findOne({ name: body.name });
      //! check slug is unique
      if (tag) {
        return NextResponse.json(
          { message: "This slug is used" },
          { status: 400 }
        );
      }
    }

    //! check slug is unique
    const tag = await Tag.findOne({ slug: body.slug });
    if (tag) {
      return NextResponse.json(
        { message: "This slug is used" },
        { status: 400 }
      );
    }

    await Tag.create(body);
    return NextResponse.json(
      { message: "Tag created successfully" },
      { status: 201 }
    );
  } catch (e) {
    console.log(`Error in create tag api: ${e}`);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/tag
 * @description get all tags
 * @access public
 */
export async function GET() {
  try {
    await connectDB();
    const tags = await Tag.find();
    return NextResponse.json(tags, { status: 200 });
  } catch (e) {
    console.error(`Error in get all tags api: ${e}`);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
