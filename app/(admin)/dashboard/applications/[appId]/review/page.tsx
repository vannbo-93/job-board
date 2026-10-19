/** @format */
import { Suspense } from "react";

export default function ApplicationReviewPage({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Review application</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <AppId params={params} />
      </Suspense>
    </main>
  );
}

async function AppId({ params }: { params: Promise<{ appId: string }> }) {
  const { appId } = await params;
  return <p>Application #{appId}</p>;
}
