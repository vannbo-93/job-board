/** @format */

import AdminPageHeader from "@/components/common/AdminPageHeader";
import JobManagementTable from "@/components/job-management/JobManagementTable";
import { getJobs } from "@/services/jobs/jobs.service";

async function JobsManagementPage() {
  const result = await getJobs();

  if (!result.success) {
    return <div>Error loading jobs</div>;
  }

  const jobs = result.data;

  return (
    <>
      <AdminPageHeader
        title="JOB POSTS"
        subtitle={`${jobs.length} TOTAL LISTINGS`}
        actionButtonLink="/dashboard/jobs/new"
        actionButtonVariant="accent"
        actionButtonText="+ CREATE JOB"
      />
      <JobManagementTable jobs={jobs} />
    </>
  );
}

export default JobsManagementPage;
