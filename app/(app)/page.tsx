/** @format */

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center gap-4 p-10 text-center">
      <h1 className="text-5xl font-bold">Job Board</h1>
      <p className="text-2xl">Welcome to Production App!</p>
      <Link
        href="/jobs"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Browse Jobs
      </Link>
    </main>
  );
}
