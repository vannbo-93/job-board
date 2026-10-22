/** @format */

"use client";

import { createContext, useContext } from "react";

type JobsContextValue = {
  search: string;
  setSearch: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
};

const JobsContext = createContext<JobsContextValue | null>(null);

export function useJobs() {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobs must be used inside <JobsProvider>");
  }
  return context;
}

export default JobsContext;
