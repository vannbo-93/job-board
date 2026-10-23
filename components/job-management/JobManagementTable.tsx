/** @format */

"use client";

import { useState } from "react";
import Link from "next/link";
import type { Job } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import DeletePopup from "@/components/common/DeletePopup";

type Props = {
  jobs: Job[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function JobManagementTable({ jobs }: Props) {
  const [jobIdToDelete, setJobIdToDelete] = useState<string | null>(null);

  const handleDeleteJob = () => {
    // TODO: delete job from database (day 9)
    console.log(`Deleting job with ID: ${jobIdToDelete}`);
    setJobIdToDelete(null);
  };

  const jobToDelete = jobs.find((job) => job.id === jobIdToDelete);

  const headerClass =
    "text-left font-heading text-xs font-bold px-4 py-3 border-r-3 border-background";

  return (
    <div className="mt-8 brutal-border overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-foreground text-background">
            <th scope="col" className={headerClass}>
              TITLE
            </th>
            <th scope="col" className={headerClass}>
              COMPANY
            </th>
            <th scope="col" className={headerClass}>
              TYPE
            </th>
            <th scope="col" className={headerClass}>
              APPLICANTS
            </th>
            <th scope="col" className={headerClass}>
              POSTED
            </th>
            <th
              scope="col"
              className="text-left font-heading text-xs font-bold px-4 py-3">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-10 text-center font-mono text-sm">
                NO JOBS YET.
              </td>
            </tr>
          )}

          {jobs.map((job, i) => (
            <tr
              key={job.id}
              className={`${i > 0 ? "border-t-3 border-foreground" : ""} hover:bg-accent/10`}>
              <td className="px-4 py-3 font-heading text-sm font-bold border-r-3">
                {job.title}
              </td>
              <td className="px-4 py-3 font-mono text-sm border-r-3">
                {job.company}
              </td>
              <td className="px-4 py-3 border-r-3">
                <span className="font-mono text-xs bg-accent text-accent-foreground px-2 py-0.5">
                  {job.type}
                </span>
              </td>
              <td className="px-4 py-3 font-mono text-sm font-bold border-r-3">
                {job.applicants}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground border-r-3 whitespace-nowrap">
                {formatDate(job.postedAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex">
                  <Link
                    href={`/dashboard/jobs/${job.id}/edit`}
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className: "shadow-none",
                    })}>
                    EDIT
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="border-l-0 shadow-none"
                    onClick={() => setJobIdToDelete(job.id)}>
                    DELETE
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeletePopup
        isOpen={jobIdToDelete !== null}
        itemName={jobToDelete?.title}
        onDelete={handleDeleteJob}
        onCancel={() => setJobIdToDelete(null)}
      />
    </div>
  );
}

export default JobManagementTable;
