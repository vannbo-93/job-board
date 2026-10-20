/** @format */

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-4 p-10 text-center">
      <h1 className="text-5xl">Job Board</h1>
      <p className="text-2xl">Welcome to Production App!</p>
      <Link href="/jobs" className={buttonVariants({ variant: "outline" })}>
        Browse Jobs
      </Link>
    </div>
  );
}
