/** @format */

import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentApplications from "@/components/dashboard/RecentApplications";
import { getJobs } from "@/services/jobs/jobs.service";
import { getApplications } from "@/services/applications/applications.service";

async function DashboardPage() {
  const [jobsResult, applicationsResult] = await Promise.all([
    getJobs(),
    getApplications(),
  ]);

  if (!jobsResult.success) return <div>Error loading jobs</div>;
  if (!applicationsResult.success) return <div>Error loading applications</div>;

  const jobs = jobsResult.data;
  const applications = applicationsResult.data;

  const interviews = applications.filter(
    (a) => a.status === "INTERVIEW",
  ).length;

  const avgScore =
    applications.length === 0
      ? "—"
      : (
          applications.reduce((sum, a) => sum + a.aiScore, 0) /
          applications.length
        ).toFixed(1);

  const totalCandidates = new Set(applications.map((a) => a.candidateId)).size;

  return (
    <>
      <h1 className="text-4xl">OVERVIEW</h1>
      <p className="font-mono text-sm text-muted-foreground mt-1">
        ADMIN DASHBOARD
      </p>

      <DashboardStats
        activeJobs={jobs.length}
        totalCandidates={totalCandidates}
        avgScore={avgScore}
        interviews={interviews}
      />
      <RecentApplications applications={applications} />
    </>
  );
}

export default DashboardPage;
