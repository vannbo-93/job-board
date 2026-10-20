/** @format */

import Link from "next/link";
import { jobs } from "@/lib/jobs";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export default function AdminJobsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Jobs</h1>
        <Link
          href="/dashboard/jobs/new"
          className={buttonVariants({ variant: "accent" })}>
          + New Job
        </Link>
      </div>
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>{job.location}</CardDescription>
          </CardHeader>
          <CardFooter className="gap-3">
            <Link
              href={`/dashboard/jobs/${job.id}`}
              className={buttonVariants({ size: "sm" })}>
              View
            </Link>
            <Link
              href={`/dashboard/jobs/${job.id}/edit`}
              className={buttonVariants({ variant: "outline", size: "sm" })}>
              Edit
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
