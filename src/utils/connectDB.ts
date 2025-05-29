import mongoose from "mongoose";

if (!process.env.MONGODB_URL)
  throw new Error("Error in connect DB: MONGODB_URL is not provide");

const cached = (global as any).mongoose || { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URL!)
      .then((c) => c.connection);
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached.conn;
  return cached.conn;
}
