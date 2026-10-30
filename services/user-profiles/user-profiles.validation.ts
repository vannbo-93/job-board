/** @format */

import { z } from "zod";

export const updateProfileSchema = z.object({
  linkedin: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || /^https?:\/\/(www\.)?linkedin\.com\//i.test(v),
      "Enter a LinkedIn profile URL (https://linkedin.com/in/...)",
    ),
});
