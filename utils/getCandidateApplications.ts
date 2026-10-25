/** @format */

import type { Application } from "@/types";

export function getCandidateApplications(
  candidateId: string,
  applications: Application[],
): Application[] {
  return applications.filter((app) => app.candidateId === candidateId);
}
