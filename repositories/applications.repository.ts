/** @format */

import type { Application } from "@/types";
import { seedApplications } from "@/lib/applications";

// In-memory store until the database lesson (day 9).
// Data is lost on server restart.
const applications: Application[] = [...seedApplications];

export async function saveNewApplication(
  data: Omit<Application, "id" | "appliedDate">,
): Promise<Application> {
  const application: Application = {
    ...data,
    id: crypto.randomUUID(),
    appliedDate: new Date().toISOString().split("T")[0],
  };
  applications.push(application);
  return application;
}

export async function findAllApplications(): Promise<Application[]> {
  return [...applications].reverse();
}

export async function findApplicationById(
  id: string,
): Promise<Application | null> {
  return applications.find((a) => a.id === id) ?? null;
}

export async function findApplicationsByCandidateId(
  candidateId: string,
): Promise<Application[]> {
  return applications.filter((a) => a.candidateId === candidateId);
}

export async function findApplicationsByJobId(
  jobId: string,
): Promise<Application[]> {
  return applications.filter((a) => a.jobId === jobId);
}

export async function findApplicationsByStatus(
  status: string,
): Promise<Application[]> {
  return applications.filter((a) => a.status === status);
}
