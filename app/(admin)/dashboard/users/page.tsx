/** @format */

import { Suspense } from "react";
import AdminPageHeader from "@/components/common/AdminPageHeader";
import UsersListingWrapper from "@/components/users/UsersListingWrapper";
import { getJobs } from "@/services/jobs/jobs.service";
import { getApplications } from "@/services/applications/applications.service";
import { getCandidates } from "@/services/candidates/candidates.service";
import { connection } from "next/server";

export default function UsersPage() {
  return (
    <Suspense fallback={<p className="font-mono text-sm">LOADING...</p>}>
      <UsersData />
    </Suspense>
  );
}

async function UsersData() {
  await connection();
  const [jobsResult, applicationsResult, candidatesResult] = await Promise.all([
    getJobs(),
    getApplications(),
    getCandidates(),
  ]);

  if (!jobsResult.success) return <div>Error loading jobs</div>;
  if (!applicationsResult.success) return <div>Error loading applications</div>;
  if (!candidatesResult.success) return <div>Error loading candidates</div>;

  const candidates = candidatesResult.data;

  return (
    <>
      <AdminPageHeader
        title="USERS"
        subtitle={`${candidates.length} REGISTERED CANDIDATES`}
      />
      <UsersListingWrapper
        jobs={jobsResult.data}
        applications={applicationsResult.data}
        candidates={candidates}
      />
    </>
  );
}
