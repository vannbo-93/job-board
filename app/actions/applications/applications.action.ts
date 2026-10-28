/** @format */

"use server";

import { revalidatePath } from "next/cache";
import { applyToJob } from "@/services/applications/applications.service";

const FIELDS = [
  "jobId",
  "candidateName",
  "candidateEmail",
  "candidateLinkedin",
  "candidateCoverLetter",
] as const;

export type ApplyToJobValues = Record<(typeof FIELDS)[number], string>;

export type ApplyToJobState =
  | {
      success?: boolean;
      errors?: Record<string, string[] | undefined>;
      values?: ApplyToJobValues;
    }
  | undefined;

export async function handleApplyToJob(
  _prevState: ApplyToJobState,
  formData: FormData,
): Promise<ApplyToJobState> {
  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "")]),
  ) as ApplyToJobValues;

  let result;
  try {
    result = await applyToJob(values);
  } catch (error) {
    console.error("handleApplyToJob failed:", error);
    return {
      success: false,
      errors: { form: ["Something went wrong. Please try again."] },
      values,
    };
  }

  if (!result.success) {
    return { success: false, errors: result.errors, values };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/applications");
  revalidatePath("/dashboard/jobs");
  return { success: true };
}
