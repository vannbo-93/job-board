/** @format */

import { Suspense } from "react";

export default function EditJobPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Edit job</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <JobId params={params} />
      </Suspense>
    </main>
  );
}

async function JobId({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  return <p>Editing job #{jobId}</p>;
}
