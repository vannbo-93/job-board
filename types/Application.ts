/** @format */

export type ApplicationStatus =
  | "SUBMITTED"
  | "REVIEW"
  | "SHORTLIST"
  | "INTERVIEW"
  | "REJECTED";

export type Application = {
  id: string;

  // Candidate
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidateLinkedin?: string;
  candidateCoverLetter?: string;

  // Job (copied at apply time so the list doesn't need a second lookup)
  jobId: string;
  jobTitle: string;
  role: string;
  jobCompany: string;

  aiScore: number;
  status: ApplicationStatus;
  appliedDate: string; // YYYY-MM-DD
};
