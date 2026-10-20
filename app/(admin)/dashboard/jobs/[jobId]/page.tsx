/** @format */

import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJob } from "@/lib/jobs";

export default function AdminJobPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  return (
    <main className="flex flex-col gap-4 p-10">
      <h1 className="text-3xl font-bold">Job (Admin)</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <JobInfo params={params} />
      </Suspense>
    </main>
  );
}

async function JobInfo({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = getJob(jobId);

  if (!job) notFound();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-400">{job.location}</p>
      <Link
        href={`/dashboard/jobs/${job.id}/edit`}
        className="inline-flex w-fit items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
        Edit
      </Link>
    </div>
  );
}
