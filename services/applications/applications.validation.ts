/** @format */

import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .transform((v) => (v === "" ? undefined : v))
  .optional();

export const applyToJobSchema = z.object({
  jobId: z.string().min(1, "Job is missing"),
  candidateName: z.string().trim().min(2, "Name must be at least 2 characters"),
  candidateEmail: z.email("Enter a valid email"),
  candidateLinkedin: optionalText,
  candidateCoverLetter: optionalText,
});

export type ApplyToJobInput = z.input<typeof applyToJobSchema>;
