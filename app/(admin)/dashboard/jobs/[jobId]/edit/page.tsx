/** @format */

import { Suspense } from "react";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/common/AdminPageHeader";
import EditJobForm from "@/components/job-management//EditJobForm";
import { getJob } from "@/services/jobs/jobs.service";

export default function EditJobPage(
  props: PageProps<"/dashboard/jobs/[jobId]/edit">,
) {
  return (
    <Suspense fallback={<p className="font-mono text-sm">LOADING...</p>}>
      <EditJob params={props.params} />
    </Suspense>
  );
}

async function EditJob({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const result = await getJob(jobId);

  if (!result.success) notFound();

  const job = result.data;

  return (
    <>
      <AdminPageHeader
        title="EDIT JOB"
        subtitle={job.title}
        actionButtonLink="/dashboard/jobs"
        actionButtonVariant="outline"
        actionButtonText="← BACK"
      />
      <EditJobForm job={job} />
    </>
  );
}
