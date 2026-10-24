/** @format */

import type { ApplicationStatus } from "./Application";

export const StatusFilters = [
  "ALL",
  "SUBMITTED",
  "REVIEW",
  "SHORTLIST",
  "INTERVIEW",
  "REJECTED",
] as const satisfies readonly ("ALL" | ApplicationStatus)[];

export type StatusFilter = (typeof StatusFilters)[number];
