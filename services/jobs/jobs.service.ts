/** @format */

import { z } from "zod";
import type { Job, ServiceResult } from "@/types";
import { createJobSchema } from "./jobs.validation";
import {
  findAllJobs,
  findJobById,
  saveNewJob,
  updateJobById,
} from "@/repositories/jobs.repository";
import { deleteJobById } from "@/repositories/jobs.repository";

// Shared by create and update: validate raw input against the schema
function validateJob(input: unknown) {
  const validated = createJobSchema.safeParse(input);
  if (!validated.success) {
    return {
      ok: false as const,
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }
  return { ok: true as const, data: validated.data };
}

export async function createJob(input: unknown): Promise<ServiceResult<Job>> {
  const validated = validateJob(input);
  if (!validated.ok) return { success: false, errors: validated.errors };

  const newJob = await saveNewJob(validated.data);
  return { success: true, data: newJob };
}

export async function updateJob(
  id: string,
  input: unknown,
): Promise<ServiceResult<Job>> {
  const validated = validateJob(input);
  if (!validated.ok) return { success: false, errors: validated.errors };

  const updated = await updateJobById(id, validated.data);
  if (!updated) return { success: false, errors: { id: ["Job not found"] } };

  return { success: true, data: updated };
}

export async function getJobs(): Promise<ServiceResult<Job[]>> {
  const jobs = await findAllJobs();
  return { success: true, data: jobs };
}

export async function getJob(id: string): Promise<ServiceResult<Job>> {
  const job = await findJobById(id);
  if (!job) return { success: false, errors: { id: ["Job not found"] } };

  return { success: true, data: job };
}

export async function deleteJob(
  id: string,
): Promise<ServiceResult<{ id: string }>> {
  const deleted = await deleteJobById(id);
  if (!deleted) return { success: false, errors: { id: ["Job not found"] } };

  return { success: true, data: { id } };
}
