/** @format */

import { Schema, model, models, type InferSchemaType } from "mongoose";

const applicationSchema = new Schema(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    candidateName: { type: String, required: true, trim: true },
    candidateEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    candidateLinkedin: { type: String, trim: true },
    candidateCoverLetter: { type: String, trim: true },

    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },
    jobTitle: { type: String, required: true },
    role: { type: String, required: true },
    jobCompany: { type: String, required: true },

    aiScore: { type: Number, default: 0, min: 0, max: 10 },
    status: {
      type: String,
      enum: ["SUBMITTED", "REVIEW", "SHORTLIST", "INTERVIEW", "REJECTED"],
      default: "SUBMITTED",
    },
    appliedDate: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

// One application per email per job (until real candidate accounts exist)
applicationSchema.index({ jobId: 1, candidateEmail: 1 }, { unique: true });

export type ApplicationDoc = InferSchemaType<typeof applicationSchema>;

export const ApplicationModel =
  models.Application ?? model("Application", applicationSchema);
