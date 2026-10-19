/** @format */

import { Suspense } from "react";

type Props = {
  params: Promise<{ appId: string }>;
};

function ApplicationDetailsPage({ params }: Props) {
  return (
    <div>
      <h1>Application Details</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ApplicationInfo params={params} />
      </Suspense>
    </div>
  );
}

async function ApplicationInfo({ params }: Props) {
  const { appId } = await params;
  return <p>Application #{appId}</p>;
}

export default ApplicationDetailsPage;
