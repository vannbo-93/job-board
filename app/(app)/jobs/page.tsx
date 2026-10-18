/** @format */

import Link from "next/link";
import { jobs } from "@/app/lib/jobs";

export default function JobsPage() {
  return (
    <main className="flex flex-col items-center gap-6 p-10">
      <h1 className="text-4xl font-bold">Jobs</h1>
      {jobs.map((job) => (
        <div
          key={job.id}
          className="flex flex-col items-center gap-2 rounded-lg border-2 border-gray-300 p-6">
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <p className="text-gray-400">{job.location}</p>
          <Link
            href={`/jobs/${job.id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            View Job
          </Link>
        </div>
      ))}
    </main>
  );
}
