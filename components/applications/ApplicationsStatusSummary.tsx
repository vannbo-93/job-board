/** @format */

import { useApplications } from "@/context/applications/ApplicationsContext";
import type { ApplicationStatus } from "@/types";

const STATUSES: { status: ApplicationStatus; color: string }[] = [
  { status: "SUBMITTED", color: "border-t-muted-foreground" },
  { status: "REVIEW", color: "border-t-warning" },
  { status: "SHORTLIST", color: "border-t-accent" },
  { status: "INTERVIEW", color: "border-t-info" },
  { status: "REJECTED", color: "border-t-destructive" },
];

function ApplicationsStatusSummary() {
  const { statusFilter, setStatusFilter, applications } = useApplications();

  return (
    // pl/pt + negative margins on items = shared 3px borders instead of doubled ones
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 pl-[3px] pt-[3px]">
      {STATUSES.map(({ status, color }) => {
        const count = applications.filter((a) => a.status === status).length;
        const active = statusFilter === status;

        return (
          <button
            key={status}
            type="button"
            aria-pressed={active}
            onClick={() => setStatusFilter(active ? "ALL" : status)}
            className={`-ml-[3px] -mt-[3px] brutal-border border-t-[6px] ${color} p-4 text-left ${
              active ? "bg-accent/10" : "hover:bg-muted"
            }`}>
            <p className="font-mono text-2xl font-bold">{count}</p>
            <p className="font-mono text-[10px] text-muted-foreground mt-1">
              {status}
            </p>
          </button>
        );
      })}
    </div>
  );
}

export default ApplicationsStatusSummary;
