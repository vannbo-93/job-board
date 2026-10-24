/** @format */

"use client";

import type { Application, Candidate, Job } from "@/types";
import ApplicationsProvider from "@/context/applications/ApplicationsProvider";
import ApplicationsFilter from "./ApplicationsFilter";
import ApplicationsStatusSummary from "./ApplicationsStatusSummary";
import ApplicationsTable from "./ApplicationsTable";

type Props = {
  jobs: Job[];
  applications: Application[];
  candidates: Candidate[];
};

function ApplicationsListingWrapper({ jobs, applications, candidates }: Props) {
  return (
    <ApplicationsProvider
      jobs={jobs}
      applications={applications}
      candidates={candidates}>
      <ApplicationsFilter />
      <ApplicationsStatusSummary />
      <ApplicationsTable />
    </ApplicationsProvider>
  );
}

export default ApplicationsListingWrapper;
