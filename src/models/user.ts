import {
  Schema,
  models,
  model,
  InferSchemaType,
  Document,
  Model,
} from "mongoose";
import { SignJWT } from "jose";

import bcrypt from "bcryptjs";
import { JwtPayloadType } from "@/utils/types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name must be at most 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true, // for optimize search
      match: [/^[^\s@]+@([^\s@]+\.)+[^\s@]{2,}$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password") || !user.password) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (e) {
    next(
      e instanceof Error
        ? e
        : new Error("An error occurred while hashing password")
    );
  }
});

// use in login to check password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.signJwt = async function () {
  const payload: JwtPayloadType = { id: this._id.toString() };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", type: "JWT" })
    .setExpirationTime("3d")
    .sign(
      new TextEncoder().encode(
        process.env.JWT_SECRET_KEY || "this_my_secret_key"
      )
    );

  return token;
};

// to delete password in this case ==> res.json(user)
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

type UserSchemaType = InferSchemaType<typeof userSchema>;

export interface UserDocument extends Document, UserSchemaType {
  comparePassword(candidatePassword: string): Promise<boolean>;
  signJwt(): Promise<string>;
}

interface UserModel extends Model<UserDocument> {}

const User =
  (models.User as UserModel) ||
  model<UserDocument, UserModel>("User", userSchema);

export default User;
