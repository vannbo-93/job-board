/** @format */

import { Schema, model, models, type InferSchemaType } from "mongoose";

const jobSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ["FULL-TIME", "PART-TIME", "CONTRACT", "INTERNSHIP"],
    },
    salary: { type: String, required: true },
    tags: { type: [String], default: [] },
    description: { type: String, required: true },
    requirements: { type: [String], default: [] },
    applicants: { type: Number, default: 0 },
    postedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

export type JobDoc = InferSchemaType<typeof jobSchema>;

// models.Job ?? prevents "Cannot overwrite model" on hot reload
export const JobModel = models.Job ?? model("Job", jobSchema);
