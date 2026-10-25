/** @format */

import type { Candidate } from "@/types";

export function getCandidate(
  candidateId: string,
  candidates: Candidate[],
): Candidate | null {
  return candidates.find((c) => c.id === candidateId) ?? null;
}
