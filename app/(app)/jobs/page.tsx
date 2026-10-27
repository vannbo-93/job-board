/** @format */

import { Suspense } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import FilterSidebar from "@/components/jobs/FilterSidebar";
import { JobsList } from "@/components/jobs/JobsList";
import JobsProvider from "@/context/jobs/JobsProvider";
import { getJobs } from "@/services/jobs/jobs.service";
import { connection } from "next/server";

export default function JobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Suspense
        fallback={<p className="font-mono text-sm">LOADING POSITIONS...</p>}>
        <JobsData />
      </Suspense>
    </div>
  );
}

async function JobsData() {
  await connection();
  const result = await getJobs();
  const jobs = result.success ? result.data : [];

  return (
    <>
      <PageHeader
        title="ALL POSITIONS"
        subtitle={`${jobs.length} OPEN ROLES`}
      />
      <JobsProvider>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
          <FilterSidebar />
          <JobsList jobs={jobs} />
        </div>
      </JobsProvider>
    </>
  );
}
