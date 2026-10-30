/** @format */
import mongoose, { Schema, type InferSchemaType } from "mongoose";

const userProfileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    linkedin: {
      type: String,
      default: "",
      trim: true,
    },
    resumeUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

export type UserProfileDoc = InferSchemaType<typeof userProfileSchema>;

export const UserProfileModel =
  mongoose.models.UserProfile ||
  mongoose.model("UserProfile", userProfileSchema);
