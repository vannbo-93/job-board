/** @format */

import { Job } from "@/types/Jobs";
import { jobs } from "@/lib/jobs";
import { z } from "zod";
import { createJobSchema } from "@/services/jobs/jobs.validation";

type NewJob = z.output<typeof createJobSchema>;

export async function findAllJobs(): Promise<Job[]> {
  return jobs;
}

export async function findJobById(id: string): Promise<Job | undefined> {
  return jobs.find((job) => job.id === id);
}

export async function saveNewJob(data: NewJob): Promise<Job> {
  const newJob: Job = {
    id: crypto.randomUUID(),
    ...data,
    type: data.type as Job["type"],
  };
  jobs.push(newJob);
  return newJob;
}
