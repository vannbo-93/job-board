/** @format */

import { z } from "zod";
import type { ServiceResult, UserProfile } from "@/types";
import { getCurrentUser } from "@/lib/current-user";
import {
  findUserProfileByUserId,
  saveUserProfile,
} from "@/repositories/user-profiles.repository";
import { updateProfileSchema } from "./user-profiles.validation";

export async function getMyProfile(): Promise<UserProfile | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  return findUserProfileByUserId(user.id);
}

export async function updateMyProfile(
  input: unknown,
): Promise<ServiceResult<UserProfile>> {
  const user = await getCurrentUser();
  if (!user) return { success: false, errors: { auth: ["Please log in"] } };

  const validated = updateProfileSchema.safeParse(input);
  if (!validated.success) {
    return {
      success: false,
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  // userId always comes from the session, never from the form
  const profile = await saveUserProfile({
    userId: user.id,
    linkedin: validated.data.linkedin,
  });
  return { success: true, data: profile };
}
