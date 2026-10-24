/** @format */

"use client";

import { useMemo, useState } from "react";
import type { Application, Candidate, Job } from "@/types";
import ApplicationsContext from "./ApplicationsContext";

type Props = {
  jobs: Job[];
  candidates: Candidate[];
  applications: Application[];
  children: React.ReactNode;
};

function ApplicationsProvider({
  jobs,
  candidates,
  applications,
  children,
}: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [jobFilter, setJobFilter] = useState("ALL");

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((app) => {
      const matchesSearch =
        !query ||
        app.candidateName.toLowerCase().includes(query) ||
        app.candidateEmail.toLowerCase().includes(query) ||
        app.jobTitle.toLowerCase().includes(query) ||
        app.jobCompany.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" || app.status === statusFilter;
      const matchesJob = jobFilter === "ALL" || app.jobId === jobFilter;

      return matchesSearch && matchesStatus && matchesJob;
    });
  }, [applications, search, statusFilter, jobFilter]);

  return (
    <ApplicationsContext.Provider
      value={{
        jobs,
        candidates,
        applications,
        filteredApplications,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        jobFilter,
        setJobFilter,
      }}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export default ApplicationsProvider;
