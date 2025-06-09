import { NextRequest, NextResponse } from "next/server";
import verifyToken from "./libs/Jose";

export async function middleware(request: NextRequest) {
  //TODO>> api routes protection
  const pathname = request.nextUrl.pathname;
  const isMeApiPath = pathname.startsWith("/api/auth/me");
  const isUserApiPath = pathname.startsWith("/api/user");
  const isPostApiPath =
    pathname.startsWith("/api/post") && request.method !== "GET";
  const isProfilePage = pathname.startsWith("/profile");

  if (isMeApiPath || isUserApiPath || isPostApiPath || isProfilePage) {
    try {
      const token = request.cookies.get("token")?.value;
      if (!token) throw new Error("There is not token..");
      const { id: userId } = await verifyToken(token);
      if (!userId) {
        if (isProfilePage) {
          return NextResponse.redirect(new URL("/login", request.nextUrl));
        }
        return NextResponse.json(
          { message: "Unauthorized - No user Id in headers" },
          { status: 401 }
        );
      }
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", userId as string);
      return NextResponse.next({ request: { headers: requestHeaders } });
    } catch (e) {
      if (isProfilePage) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
      }
      console.error(`Error in Protected Route middleware: ${e}`);
    }
  }

  //TODO>> login&register page routes protection
  const isAuthPage =
    pathname.startsWith("/register") || pathname.startsWith("/login");
  if (isAuthPage) {
    const token = request.cookies.get("token")?.value;
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/auth/me",
    "/api/user/:path*",
    "/api/post/:path*",
    "/login",
    "/register",
    "/profile/:path*",
  ],
};
