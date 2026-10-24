/** @format */

import type { Candidate } from "@/types";
import { seedCandidates } from "@/lib/candidates";

// In-memory store until the database lesson (day 9)
const candidates: Candidate[] = [...seedCandidates];

export async function findAllCandidates(): Promise<Candidate[]> {
  return candidates;
}

export async function findCandidateById(id: string): Promise<Candidate | null> {
  return candidates.find((c) => c.id === id) ?? null;
}

export async function findCandidateByEmail(
  email: string,
): Promise<Candidate | null> {
  const normalized = email.trim().toLowerCase();
  return candidates.find((c) => c.email.toLowerCase() === normalized) ?? null;
}
