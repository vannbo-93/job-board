/** @format */

import type { Candidate, ServiceResult } from "@/types";
import {
  findAllCandidates,
  findCandidateById,
} from "@/repositories/candidates.repository";

export async function getCandidates(): Promise<ServiceResult<Candidate[]>> {
  const candidates = await findAllCandidates();
  return { success: true, data: candidates };
}

export async function getCandidate(
  id: string,
): Promise<ServiceResult<Candidate>> {
  const candidate = await findCandidateById(id);

  if (!candidate) {
    return { success: false, errors: { id: ["Candidate not found"] } };
  }

  return { success: true, data: candidate };
}
