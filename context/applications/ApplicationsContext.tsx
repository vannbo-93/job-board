/** @format */

"use client";

import { createContext, useContext } from "react";
import type { Application, Candidate, Job } from "@/types";

export type ApplicationsContextValue = {
  jobs: Job[];
  candidates: Candidate[];
  applications: Application[];
  filteredApplications: Application[];
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  jobFilter: string;
  setJobFilter: (value: string) => void;
};

const ApplicationsContext = createContext<ApplicationsContextValue | null>(
  null,
);

export function useApplications() {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error(
      "useApplications must be used inside <ApplicationsProvider>",
    );
  }
  return context;
}

export default ApplicationsContext;
