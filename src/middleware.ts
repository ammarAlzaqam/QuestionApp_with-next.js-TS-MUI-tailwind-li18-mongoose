import { NextRequest, NextResponse } from "next/server";
import verifyToken from "./libs/Jose";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) throw new Error("There is not token..");
    const { id: userId } = await verifyToken(token);
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized - No user Id in headers" },
        { status: 401 }
      );
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", userId as string);
    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch (e) {
    console.error(`Error in Protected Route middleware: ${e}`);
  }
}

export const config = {
  matcher: ["/api/auth/me", "/api/user/:path*"],
};
