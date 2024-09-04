import mongoose, { Document } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  username: string;
  profile: UserProfile;
}

interface UserProfile {
  age: number;
  birthDate: Date;
  fullName: string;
  avatarUrl: string;
  bio: string;
}

export const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    profile: {
      age: { type: Number, required: true },
      birthDate: { type: Date, required: true },
      fullName: {
        type: String,
        default: "",
      },
      avatarUrl: {
        type: String,
        default: "",
      },
      bio: {
        type: String,
        default: "",
      },
    },
    deletedAt: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = mongoose.model<User>("User", userSchema);
