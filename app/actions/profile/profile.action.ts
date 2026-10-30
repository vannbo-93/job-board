/** @format */

"use server";

import { revalidatePath } from "next/cache";
import { updateMyProfile } from "@/services/user-profiles/user-profiles.service";

export type ProfileState =
  | {
      success?: boolean;
      errors?: Record<string, string[] | undefined>;
      values?: { linkedin: string };
    }
  | undefined;

export async function handleUpdateProfile(
  _prevState: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const values = { linkedin: String(formData.get("linkedin") ?? "") };

  let result;
  try {
    result = await updateMyProfile(values);
  } catch (error) {
    console.error("handleUpdateProfile failed:", error);
    return {
      errors: { form: ["Something went wrong. Please try again."] },
      values,
    };
  }

  if (!result.success) {
    return { errors: result.errors, values };
  }

  revalidatePath("/profile");
  return { success: true, values };
}
