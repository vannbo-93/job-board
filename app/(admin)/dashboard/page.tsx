/** @format */

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Admin Dashboard</h1>
      <div className="flex gap-4">
        <Link href="/dashboard/jobs" className={buttonVariants()}>
          Jobs
        </Link>
        <Link
          href="/dashboard/applications"
          className={buttonVariants({ variant: "outline" })}>
          Applications
        </Link>
      </div>
    </div>
  );
}
