/** @format */

import { Types, isValidObjectId } from "mongoose";
import { dbConnect } from "@/lib/db";
import {
  ApplicationModel,
  type ApplicationDoc,
} from "@/lib/models/application.model";
import type { Application } from "@/types";

type ApplicationLean = ApplicationDoc & { _id: { toString(): string } };

function toApplication(doc: ApplicationLean): Application {
  const {
    _id,
    candidateId,
    jobId,
    appliedDate,
    status,
    candidateLinkedin,
    candidateCoverLetter,
    ...rest
  } = doc;
  return {
    ...rest,
    id: _id.toString(),
    candidateId: candidateId.toString(),
    jobId: jobId.toString(),
    status: status as Application["status"],
    candidateLinkedin: candidateLinkedin ?? undefined,
    candidateCoverLetter: candidateCoverLetter ?? undefined,
    appliedDate: new Date(appliedDate).toISOString().split("T")[0],
  };
}

export async function saveNewApplication(
  data: Omit<Application, "id" | "appliedDate">,
): Promise<Application> {
  await dbConnect();
  const created = await ApplicationModel.create({
    ...data,
    candidateId: new Types.ObjectId(data.candidateId),
    jobId: new Types.ObjectId(data.jobId),
  });
  return toApplication(created.toObject() as ApplicationLean);
}

export async function findAllApplications(): Promise<Application[]> {
  await dbConnect();
  const docs = await ApplicationModel.find({})
    .sort({ appliedDate: -1 })
    .lean<ApplicationLean[]>();
  return docs.map(toApplication);
}

export async function findApplicationById(
  id: string,
): Promise<Application | null> {
  if (!isValidObjectId(id)) return null;
  await dbConnect();
  const doc = await ApplicationModel.findById(id).lean<ApplicationLean>();
  return doc ? toApplication(doc) : null;
}

export async function findApplicationsByCandidateId(
  candidateId: string,
): Promise<Application[]> {
  if (!isValidObjectId(candidateId)) return [];
  await dbConnect();
  const docs = await ApplicationModel.find({ candidateId }).lean<
    ApplicationLean[]
  >();
  return docs.map(toApplication);
}

export async function findApplicationsByJobId(
  jobId: string,
): Promise<Application[]> {
  if (!isValidObjectId(jobId)) return [];
  await dbConnect();
  const docs = await ApplicationModel.find({ jobId }).lean<ApplicationLean[]>();
  return docs.map(toApplication);
}

export async function findApplicationsByStatus(
  status: string,
): Promise<Application[]> {
  await dbConnect();
  const docs = await ApplicationModel.find({ status }).lean<
    ApplicationLean[]
  >();
  return docs.map(toApplication);
}
