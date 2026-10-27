/** @format */

import { Suspense } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturedJobs } from "@/components/landing/FeaturedJobs";
import { getJobs } from "@/services/jobs/jobs.service";
import { connection } from "next/server";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense
        fallback={
          <p className="max-w-7xl mx-auto px-6 py-16 font-mono text-sm">
            LOADING...
          </p>
        }>
        <FeaturedJobsData />
      </Suspense>
    </>
  );
}

async function FeaturedJobsData() {
  await connection();
  const result = await getJobs();
  if (!result.success) return null;
  return <FeaturedJobs jobs={result.data} />;
}
