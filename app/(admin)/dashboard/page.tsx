/** @format */

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold p-10">Admin Dashboard</h1>;
      <Link
        className=" bg-blue-500 text-white p-2 mr-2 rounded-md hover:bg-blue-600"
        href="/dashboard/jobs">
        Jobs
      </Link>
      <Link
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        href="/dashboard/applications">
        Applications
      </Link>
    </div>
  );
}
