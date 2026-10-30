/** @format */

import { Suspense } from "react";
import Link from "next/link";
import UserMenu from "./UserMenu";

const navLinkClass =
  "font-heading text-sm font-bold hover:text-accent transition-none";

function NavbarHeader() {
  return (
    <nav className="brutal-border border-x-0 border-t-0 bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="font-heading text-2xl font-bold tracking-tight">
            WADIFA<span className="text-accent">_</span>
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            <Link href="/" className={navLinkClass}>
              HOME
            </Link>
            <Link href="/jobs" className={navLinkClass}>
              BROWSE JOBS
            </Link>
          </div>
        </div>

        {/* Reserve the space so the navbar doesn't jump when the menu appears */}
        <Suspense fallback={<div className="h-10 w-44" />}>
          <UserMenu />
        </Suspense>
      </div>
    </nav>
  );
}

export default NavbarHeader;
