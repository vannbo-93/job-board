/** @format */

import Link from "next/link";
import { jobs } from "../../../lib/jobs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export default function JobsPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-10">
      <h1 className="text-4xl">Jobs</h1>
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription>{job.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2">{job.description}</p>
          </CardContent>
          <CardFooter>
            <Link href={`/jobs/${job.id}`} className={buttonVariants()}>
              View Job
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
