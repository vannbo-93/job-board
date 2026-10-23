/** @format */

import { z } from "zod";

// "React, Next.js" -> ["React", "Next.js"]
const commaList = z.string().transform((v) =>
  v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
);

// one item per line -> array
const lineList = z.string().transform((v) =>
  v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean),
);

export const createJobSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  company: z.string().trim().min(2, "Company is required"),
  location: z.string().trim().min(2, "Location is required"),
  type: z.enum(["FULL-TIME", "PART-TIME", "CONTRACT", "INTERNSHIP"], {
    error: "Select a job type",
  }),
  salary: z.string().trim().min(1, "Salary is required"),
  tags: commaList.pipe(z.array(z.string()).min(1, "Add at least one tag")),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters"),
  requirements: lineList.pipe(
    z.array(z.string()).min(1, "Add at least one requirement"),
  ),
});

export type CreateJobInput = z.input<typeof createJobSchema>;
