/** @format */

import AdminPageHeader from "@/components/common/AdminPageHeader";
import ApplicationsListingWrapper from "@/components/applications/ApplicationsListingWrapper";
import { getJobs } from "@/services/jobs/jobs.service";
import { getApplications } from "@/services/applications/applications.service";
import { getCandidates } from "@/services/candidates/candidates.service";

async function ApplicationsManagementPage() {
  const [jobsResult, applicationsResult, candidatesResult] = await Promise.all([
    getJobs(),
    getApplications(),
    getCandidates(),
  ]);

  if (!jobsResult.success) return <div>Error loading jobs</div>;
  if (!applicationsResult.success) return <div>Error loading applications</div>;
  if (!candidatesResult.success) return <div>Error loading candidates</div>;

  const jobs = jobsResult.data;
  const applications = applicationsResult.data;
  const candidates = candidatesResult.data;

  const activeCount = applications.filter(
    (a) => a.status !== "REJECTED",
  ).length;

  return (
    <>
      <AdminPageHeader
        title="APPLICATIONS"
        subtitle={`${activeCount} ACTIVE · ${applications.length} TOTAL`}
        // TODO: restore when /dashboard/users exists
        actionButtonLink="/dashboard/users"
        actionButtonVariant="outline"
        actionButtonText="VIEW ALL USERS →"
      />
      <ApplicationsListingWrapper
        jobs={jobs}
        applications={applications}
        candidates={candidates}
      />
    </>
  );
}

export default ApplicationsManagementPage;
