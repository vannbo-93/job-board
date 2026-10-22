/** @format */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Job } from "@/types/";
import { useJobs } from "@/components/context/jobs/JobsContext";

function daysAgo(date: string, now: number) {
  const days = Math.floor((now - new Date(date).getTime()) / 86_400_000);
  if (days <= 0) return "TODAY";
  if (days === 1) return "1 DAY AGO";
  return `${days} DAYS AGO`;
}

export function JobsList({ jobs }: { jobs: Job[] }) {
  const { search, typeFilter, locationFilter } = useJobs();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setNow(Date.now()), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const query = search.trim().toLowerCase();

  const filtered = jobs.filter((job) => {
    const matchesSearch =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.tags.some((tag: string) => tag.toLowerCase().includes(query));

    const matchesType = typeFilter === "ALL" || job.type === typeFilter;

    const matchesLocation =
      locationFilter === "ALL" ||
      job.location.toLowerCase() === locationFilter.toLowerCase();

    return matchesSearch && matchesType && matchesLocation;
  });

  if (filtered.length === 0) {
    return (
      <div className="brutal-border lg:border-l-0 p-10 lg:col-span-3 font-mono text-sm">
        NO JOBS MATCH YOUR FILTERS.
      </div>
    );
  }

  return (
    <div className="brutal-border lg:border-l-0 lg:col-span-3">
      {filtered.map((job, i) => (
        <Link
          key={job.id}
          href={`/jobs/${job.id}`}
          className={`flex justify-between gap-6 p-6 hover:bg-accent/10 group ${
            i > 0 ? "border-t-3 border-foreground" : ""
          }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">
                {job.company}
              </span>
              <span className="font-mono text-xs bg-accent text-accent-foreground px-2">
                {job.type}
              </span>
            </div>
            <h3 className="mt-1 text-xl group-hover:text-accent">
              {job.title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="brutal-border-thin px-2 py-0.5 font-mono text-xs uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="font-mono text-sm uppercase">{job.location}</p>
            <p className="mt-1 font-heading text-xl font-bold">{job.salary}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {now === null ? "POSTED" : daysAgo(job.postedAt, now)} ·{" "}
              {job.applicants} APPLICANTS
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
