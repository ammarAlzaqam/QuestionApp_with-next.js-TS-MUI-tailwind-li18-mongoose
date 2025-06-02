import { serialize } from "cookie";

/**
 * Set auth Token in Cookies
 * @params token JWT Token
 */

export default function setAuthCookie(token: string) {
  return serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 3,
    sameSite: "lax",
    path: "/",
  });
}
