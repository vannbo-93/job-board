/** @format */

import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="flex gap-6 border-b border-gray-700 px-10 py-4">
        <Link href="/" className="font-bold">
          Job Board
        </Link>
        <Link href="/jobs" className="hover:text-blue-400">
          Jobs
        </Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
