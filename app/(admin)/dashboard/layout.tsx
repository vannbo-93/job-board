/** @format */

import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/jobs", label: "Jobs" },
  { href: "/dashboard/jobs/new", label: "New Job" },
  { href: "/dashboard/applications", label: "Applications" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 flex-col gap-1 bg-sidebar p-6 text-sidebar-foreground">
        <p className="mb-6 font-heading text-xl font-bold uppercase">Admin</p>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-2 font-mono text-sm uppercase hover:bg-sidebar-accent">
            {link.label}
          </Link>
        ))}
      </aside>
      <div className="flex-1 p-10">{children}</div>
    </div>
  );
}
