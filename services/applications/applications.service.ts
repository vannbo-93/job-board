/** @format */

import { z } from "zod";
import type { Application, ServiceResult } from "@/types";
import {
  findAllApplications,
  findApplicationById,
  findApplicationsByCandidateId,
  saveNewApplication,
} from "@/repositories/applications.repository";
import {
  findJobById,
  incrementJobApplicants,
} from "@/repositories/jobs.repository";
import { getCurrentUser } from "@/lib/current-user";
import { applyToJobSchema } from "./applications.validation";

const ALREADY_APPLIED = { form: ["You already applied to this job"] };

export async function applyToJob(
  input: unknown,
): Promise<ServiceResult<Application>> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { success: false, errors: { auth: ["Please log in to apply"] } };
  }

  const validated = applyToJobSchema.safeParse(input);
  if (!validated.success) {
    return {
      success: false,
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  const { jobId } = validated.data;

  // TODO: check if job is active or not
  const job = await findJobById(jobId);
  if (!job) return { success: false, errors: { jobId: ["Job not found"] } };

  const previous = await findApplicationsByCandidateId(currentUser.id);
  if (previous.some((app) => app.jobId === jobId)) {
    return { success: false, errors: ALREADY_APPLIED };
  }

  try {
    const newApplication = await saveNewApplication({
      ...validated.data,
      candidateId: currentUser.id,
      jobTitle: job.title,
      role: job.title, // TODO: confirm what "role" should hold
      jobCompany: job.company,
      aiScore: 0,
      status: "SUBMITTED",
    });

    await incrementJobApplicants(jobId);
    return { success: true, data: newApplication };
  } catch (error) {
    // E11000 = duplicate key: two submissions raced past the check above
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === 11000
    ) {
      return { success: false, errors: ALREADY_APPLIED };
    }
    throw error;
  }
}

export async function getApplications(): Promise<ServiceResult<Application[]>> {
  const applications = await findAllApplications();
  return { success: true, data: applications };
}

export async function getApplicationById(
  id: string,
): Promise<ServiceResult<Application>> {
  const application = await findApplicationById(id);
  if (!application)
    return { success: false, errors: { id: ["Application not found"] } };

  return { success: true, data: application };
}
