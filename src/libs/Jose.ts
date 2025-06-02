import { JwtPayloadType } from "@/utils/types";
import { jwtVerify } from "jose";

export default async function verifyToken(
  token: string
): Promise<JwtPayloadType> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(
        process.env.JWT_SECRET_KEY || "this-is-my-jwt-secret key..."
      )
    );
    return payload as JwtPayloadType;
  } catch (e) {
    console.error(`Error from verifyToken: ${e}`);
    throw new Error("Invalid or expired token");
  }
}
