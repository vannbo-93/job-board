/** @format */

import { z } from "zod";
import type { Job } from "@/types";
import { jobs } from "@/lib/jobs";
import { createJobSchema } from "@/services/jobs/jobs.validation";

type NewJob = z.output<typeof createJobSchema>;

export async function findAllJobs(): Promise<Job[]> {
  return jobs;
}

export async function findJobById(id: string): Promise<Job | null> {
  return jobs.find((job) => job.id === id) ?? null;
}

export async function saveNewJob(data: NewJob): Promise<Job> {
  const newJob: Job = {
    ...data,
    type: data.type as Job["type"],
    id: crypto.randomUUID(),
    postedAt: new Date().toISOString().split("T")[0],
    applicants: 0,
  };
  jobs.push(newJob);
  return newJob;
}
