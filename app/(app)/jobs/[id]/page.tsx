/** @format */

import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import JobDescription from "@/components/jobs/JobDescription";
import JobApplyForm from "@/components/jobs/JobApplyForm";
import { getJob } from "@/services/jobs/jobs.service";

export default function JobDetailsPage(props: PageProps<"/jobs/[id]">) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link
        href="/jobs"
        className="font-mono text-sm text-muted-foreground hover:text-accent transition-none">
        ← ALL POSITIONS
      </Link>

      <Suspense fallback={<p className="mt-6 font-mono text-sm">LOADING...</p>}>
        <JobDetails params={props.params} />
      </Suspense>
    </div>
  );
}

async function JobDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getJob(id);

  if (!result.success) notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mt-6">
      <JobDescription job={result.data} />
      <JobApplyForm jobId={id} />
    </div>
  );
}
