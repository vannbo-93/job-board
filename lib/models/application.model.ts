/** @format */

import mongoose, { Schema, type InferSchemaType } from "mongoose";

const applicationSchema = new Schema(
  {
    candidateId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    candidateName: { type: String, required: true, trim: true },
    candidateEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    candidateLinkedin: { type: String, trim: true },
    candidateResume: { type: String }, // TODO: add resume file upload
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

// One application per candidate per job
applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });

export type ApplicationDoc = InferSchemaType<typeof applicationSchema>;

export const ApplicationModel =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
