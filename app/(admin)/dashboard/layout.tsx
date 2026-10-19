/** @format */

import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 flex-col gap-3 border-r border-gray-700 p-6">
        <Link href="/dashboard" className="mb-4 font-bold">
          Admin
        </Link>
        <Link href="/dashboard/jobs" className="hover:text-blue-400">
          Jobs
        </Link>
        <Link href="/dashboard/jobs/new" className="hover:text-blue-400">
          New Job
        </Link>
        <Link href="/dashboard/applications" className="hover:text-blue-400">
          Applications
        </Link>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
