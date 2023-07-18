/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { IUser, IUserMethods, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
// import ApiError from "../../../error/ApiError";
// import httpStatus from "http-status";

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret["password"];
        return ret;
      },
    },
  }
);

userSchema.methods.isUserExist = async function (
  phoneNumber: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  );
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  //hashing user password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);
  return isMatched;
};



export const User = model<IUser, UserModel>("User", userSchema);
