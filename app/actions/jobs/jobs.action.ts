/** @format */

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createJob } from "@/services/jobs/jobs.service";

const FIELDS = [
  "title",
  "company",
  "location",
  "type",
  "salary",
  "tags",
  "description",
  "requirements",
] as const;

export type CreateJobValues = Omit<
  Record<(typeof FIELDS)[number], string>,
  "type"
> & {
  type: "FULL-TIME" | "PART-TIME" | "CONTRACT" | "INTERNSHIP";
};

export type CreateJobState =
  | {
      errors?: Record<string, string[] | undefined>;
      values?: CreateJobValues;
    }
  | undefined;

export async function handleCreateJob(
  _prevState: CreateJobState,
  formData: FormData,
): Promise<CreateJobState> {
  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "")]),
  ) as CreateJobValues;

  let result;
  try {
    result = await createJob(values);
  } catch (error) {
    console.error("handleCreateJob failed:", error);
    return {
      errors: { form: ["Something went wrong. Please try again."] },
      values,
    };
  }

  if (!result.success) {
    // Send the values back so the form can refill itself
    return { errors: result.errors, values };
  }

  revalidatePath("/dashboard/jobs");
  revalidatePath("/jobs");
  redirect("/dashboard/jobs");
}

import { updateJob } from "@/services/jobs/jobs.service"; // أضفها إلى الاستيراد الموجود

export async function handleUpdateJob(
  jobId: string,
  _prevState: CreateJobState,
  formData: FormData,
): Promise<CreateJobState> {
  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "")]),
  ) as CreateJobValues;

  let result;
  try {
    result = await updateJob(jobId, values);
  } catch (error) {
    console.error("handleUpdateJob failed:", error);
    return {
      errors: { form: ["Something went wrong. Please try again."] },
      values,
    };
  }

  if (!result.success) {
    return { errors: result.errors, values };
  }

  revalidatePath("/dashboard/jobs");
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${jobId}`);
  redirect("/dashboard/jobs");
}
