import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/auth/logout
 * @description delete token from header
 * @access public
 */
export async function GET() {
  try {
    const headerCookies = await cookies();
    headerCookies.delete("token");
    return NextResponse.json({ message: "Logout Successfully" });
  } catch (e) {
    console.error(`Error in Logout route: ${e}`);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
