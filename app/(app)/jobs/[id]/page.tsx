/** @format */
import { notFound } from "next/navigation";
import { jobs, getJob } from "@/app/lib/jobs";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id }));
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJob(id);

  if (!job) notFound();

  return (
    <main className="flex flex-col items-center gap-4 p-10">
      <h1 className="text-3xl font-bold">Job Details</h1>
      <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-300 p-6 text-center">
        <h2 className="text-xl font-bold">{job.title}</h2>
        <p className="text-gray-400">{job.location}</p>
        <p>{job.description}</p>
      </div>
    </main>
  );
}
