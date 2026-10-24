/** @format */

import { PageHeader } from "@/components/common/ClientPageHeader";
import FilterSidebar from "@/components/jobs/FilterSidebar";
import { getJobs } from "@/services/jobs/jobs.service";
import JobsProvider from "@/context/jobs/JobsProvider";
import { JobsList } from "@/components/jobs/JobsList";

async function JobsPage() {
  const result = await getJobs();
  const jobs = result.success ? result.data : [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
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
    </div>
  );
}

export default JobsPage;
