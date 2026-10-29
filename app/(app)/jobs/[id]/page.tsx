/** @format */

import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import JobDescription from "@/components/jobs/JobDescription";
import JobApplyForm from "@/components/jobs/JobApplyForm";
import { buttonVariants } from "@/components/ui/button";
import { getJob } from "@/services/jobs/jobs.service";
import { getCurrentUser } from "@/lib/current-user";

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
  const [result, currentUser] = await Promise.all([
    getJob(id),
    getCurrentUser(),
  ]);

  if (!result.success) notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mt-6">
      <JobDescription job={result.data} />

      {currentUser ? (
        <JobApplyForm
          jobId={id}
          defaultName={currentUser.name}
          defaultEmail={currentUser.email}
        />
      ) : (
        <div className="brutal-border lg:border-l-0 p-8 flex flex-col gap-4">
          <h3 className="text-xl">APPLY NOW</h3>
          <p className="font-mono text-sm text-muted-foreground">
            LOG IN TO APPLY FOR THIS ROLE.
          </p>
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(`/jobs/${id}`)}`}
            className={buttonVariants({ variant: "accent" })}>
            LOGIN TO APPLY →
          </Link>
        </div>
      )}
    </div>
  );
}
