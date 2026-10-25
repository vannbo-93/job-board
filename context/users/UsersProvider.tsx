/** @format */

"use client";

import { useMemo, useState } from "react";
import type { Application, Candidate, Job } from "@/types";
import UsersContext, { type UsersContextType } from "./UsersContext";

type Props = {
  jobs: Job[];
  applications: Application[];
  candidates: Candidate[];
  children: React.ReactNode;
};

function UsersProvider({ jobs, applications, candidates, children }: Props) {
  const [search, setSearch] = useState("");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const filteredCandidates = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return candidates;

    return candidates.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.skills.some((skill) => skill.toLowerCase().includes(query)),
    );
  }, [candidates, search]);

  const avgScore = useMemo(() => {
    // Only applications that have been scored (new ones start at 0)
    const scored = applications.filter((a) => a.aiScore > 0);
    if (scored.length === 0) return 0;

    const avg = scored.reduce((sum, a) => sum + a.aiScore, 0) / scored.length;
    return Math.round(avg * 10) / 10;
  }, [applications]);

  const value: UsersContextType = {
    search,
    setSearch,
    expandedUser,
    setExpandedUser,
    candidates,
    jobs,
    applications,
    filteredCandidates,
    avgScore,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

export default UsersProvider;
