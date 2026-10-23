/** @format */

import { z } from "zod";
import type { Application, ServiceResult } from "@/types";
import {
  findAllApplications,
  findApplicationById,
  findApplicationsByCandidateId,
  saveNewApplication,
} from "@/repositories/applications.repository";
import { findJobById } from "@/repositories/jobs.repository";
import {
  applyToJobSchema,
  type ApplyToJobInput,
} from "./applications.validation";

// TODO: replace with the logged-in candidate once authentication exists (day 10)
const TEMP_CANDIDATE_ID = "69f21dc7e02f33189d6b08d8";

export async function applyToJob(
  input: ApplyToJobInput,
): Promise<ServiceResult<Application>> {
  const validated = applyToJobSchema.safeParse(input);

  if (!validated.success) {
    return {
      success: false,
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  const { jobId } = validated.data;

  const job = await findJobById(jobId);
  if (!job) {
    return { success: false, errors: { jobId: ["Job not found"] } };
  }

  const candidateId = TEMP_CANDIDATE_ID;

  const previous = await findApplicationsByCandidateId(candidateId);
  if (previous.some((app: Application) => app.jobId === jobId)) {
    return {
      success: false,
      errors: { jobId: ["You already applied to this job"] },
    };
  }

  const newApplication = await saveNewApplication({
    ...validated.data,
    candidateId,
    jobTitle: job.title,
    role: job.title, // TODO: confirm what "role" should hold
    jobCompany: job.company,
    aiScore: 0,
    status: "SUBMITTED",
  });

  return { success: true, data: newApplication };
}

export async function getApplications(): Promise<ServiceResult<Application[]>> {
  const applications = await findAllApplications();
  return { success: true, data: applications };
}

export async function getApplicationById(
  id: string,
): Promise<ServiceResult<Application>> {
  const application = await findApplicationById(id);

  if (!application) {
    return { success: false, errors: { id: ["Application not found"] } };
  }

  return { success: true, data: application };
}
