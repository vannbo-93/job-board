/** @format */

import { Suspense } from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentApplications from "@/components/dashboard/RecentApplications";
import { getJobs } from "@/services/jobs/jobs.service";
import { getApplications } from "@/services/applications/applications.service";
import { connection } from "next/server";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-4xl">OVERVIEW</h1>
      <p className="font-mono text-sm text-muted-foreground mt-1">
        ADMIN DASHBOARD
      </p>

      <Suspense fallback={<p className="mt-6 font-mono text-sm">LOADING...</p>}>
        <DashboardData />
      </Suspense>
    </>
  );
}

async function DashboardData() {
  await connection();
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
  const scored = applications.filter((a) => a.aiScore > 0);
  const avgScore =
    scored.length === 0
      ? "—"
      : (scored.reduce((sum, a) => sum + a.aiScore, 0) / scored.length).toFixed(
          1,
        );
  const totalCandidates = new Set(applications.map((a) => a.candidateId)).size;

  return (
    <>
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
