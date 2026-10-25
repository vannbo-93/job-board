/** @format */

"use client";

import { createContext, useContext } from "react";
import type { Application, Candidate, Job } from "@/types";

export type UsersContextType = {
  search: string;
  setSearch: (search: string) => void;
  expandedUser: string | null;
  setExpandedUser: (userId: string | null) => void;
  candidates: Candidate[];
  jobs: Job[];
  applications: Application[];
  filteredCandidates: Candidate[];
  avgScore: number;
};

const UsersContext = createContext<UsersContextType | null>(null);

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used inside <UsersProvider>");
  }
  return context;
}

export default UsersContext;
