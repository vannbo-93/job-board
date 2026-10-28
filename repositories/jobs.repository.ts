/** @format */

import { isValidObjectId } from "mongoose";
import type { z } from "zod";
import type { Job } from "@/types";
import { dbConnect } from "@/lib/db";
import { JobModel, type JobDoc } from "@/lib/models/job.model";
import type { createJobSchema } from "@/services/jobs/jobs.validation";

type NewJob = z.output<typeof createJobSchema>;
type JobLean = JobDoc & { _id: { toString(): string } };

// MongoDB document -> plain Job (string id, YYYY-MM-DD date)
function toJob(doc: JobLean): Job {
  const { _id, postedAt, type, ...rest } = doc;
  return {
    ...rest,
    id: _id.toString(),
    type: type as Job["type"],
    postedAt: new Date(postedAt).toISOString().split("T")[0],
  };
}

export async function findAllJobs(): Promise<Job[]> {
  await dbConnect();
  const docs = await JobModel.find({}).sort({ postedAt: -1 }).lean<JobLean[]>();
  return docs.map(toJob);
}

export async function findJobById(id: string): Promise<Job | null> {
  if (!isValidObjectId(id)) return null;
  await dbConnect();
  const doc = await JobModel.findById(id).lean<JobLean>();
  return doc ? toJob(doc) : null;
}

export async function saveNewJob(data: NewJob): Promise<Job> {
  await dbConnect();
  const created = await JobModel.create(data);
  return toJob(created.toObject() as JobLean);
}

export async function updateJobById(
  id: string,
  data: NewJob,
): Promise<Job | null> {
  if (!isValidObjectId(id)) return null;
  await dbConnect();
  const doc = await JobModel.findByIdAndUpdate(id, data, {
    new: true, // return the updated document, not the old one
    runValidators: true, // apply the schema rules (enum, required) on update too
  }).lean<JobLean>();
  return doc ? toJob(doc) : null;
}

export async function deleteJobById(id: string): Promise<boolean> {
  if (!isValidObjectId(id)) return false;
  await dbConnect();
  const deleted = await JobModel.findByIdAndDelete(id);
  return deleted !== null;
}
//دالة تزيد العداد
export async function incrementJobApplicants(id: string): Promise<void> {
  if (!isValidObjectId(id)) return;
  await dbConnect();
  await JobModel.updateOne({ _id: id }, { $inc: { applicants: 1 } });
}
