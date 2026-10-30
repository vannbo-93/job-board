/** @format */

import { isValidObjectId } from "mongoose";
import { dbConnect } from "@/lib/db";
import {
  UserProfileModel,
  type UserProfileDoc,
} from "@/lib/models/user-profile.model";
import type { UserProfile } from "@/types/UserProfile";

type UserProfileLean = UserProfileDoc & { _id: { toString(): string } };

// Pick allowed fields by name, so timestamps or future fields never leak through
function toUserProfile(doc: UserProfileLean): UserProfile {
  return {
    id: doc._id.toString(),
    userId: doc.userId.toString(),
    linkedin: doc.linkedin ?? "",
    resumeUrl: doc.resumeUrl ?? undefined,
  };
}

export async function findUserProfileByUserId(
  userId: string,
): Promise<UserProfile | null> {
  if (!isValidObjectId(userId)) return null;
  await dbConnect();
  const profile = await UserProfileModel.findOne({
    userId,
  }).lean<UserProfileLean>();
  return profile ? toUserProfile(profile) : null;
}

// Creates the profile if it doesn't exist yet, otherwise updates it
export async function saveUserProfile(
  profile: Omit<UserProfile, "id">,
): Promise<UserProfile> {
  await dbConnect();

  const saved = await UserProfileModel.findOneAndUpdate(
    { userId: profile.userId },
    profile,
    {
      new: true, // return the document after the update
      upsert: true, // create it if no profile exists for this user
      setDefaultsOnInsert: true,
      runValidators: true, // apply schema rules (trim, types) on update too
    },
  ).lean<UserProfileLean>();

  if (!saved) {
    throw new Error("Failed to save user profile");
  }

  return toUserProfile(saved);
}
