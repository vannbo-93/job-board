/** @format */

import { z } from "zod";
import type { Application, ServiceResult } from "@/types";
import {
  findAllApplications,
  findApplicationById,
  findApplicationsByJobId,
  saveNewApplication,
} from "@/repositories/applications.repository";
import {
  findJobById,
  incrementJobApplicants,
} from "@/repositories/jobs.repository";
import { applyToJobSchema } from "./applications.validation";

// TODO: replace with the logged-in candidate once authentication exists (day 10)
const TEMP_CANDIDATE_ID = "69f21dc7e02f33189d6b08d8";

const ALREADY_APPLIED = {
  candidateEmail: ["You already applied to this job with this email"],
};

export async function applyToJob(
  input: unknown,
): Promise<ServiceResult<Application>> {
  const validated = applyToJobSchema.safeParse(input);
  if (!validated.success) {
    return {
      success: false,
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  const { jobId, candidateEmail } = validated.data;

  const job = await findJobById(jobId);
  if (!job) return { success: false, errors: { jobId: ["Job not found"] } };

  // Friendly check first; the unique index below is the real guarantee
  const existing = await findApplicationsByJobId(jobId);
  if (
    existing.some((app) => app.candidateEmail === candidateEmail.toLowerCase())
  ) {
    return { success: false, errors: ALREADY_APPLIED };
  }

  try {
    const newApplication = await saveNewApplication({
      ...validated.data,
      candidateId: TEMP_CANDIDATE_ID,
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
