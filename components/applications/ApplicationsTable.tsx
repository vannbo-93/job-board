/** @format */

import Link from "next/link";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { AiScore, StatusBadge } from "@/components/BrutalUI";
import { useApplications } from "@/context/applications/ApplicationsContext";

const COLS = "grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr] gap-4";

function ApplicationsTable() {
  const { filteredApplications } = useApplications();

  return (
    <div className="mt-6 brutal-border overflow-x-auto">
      <div className="min-w-[860px]">
        <div className={`${COLS} bg-foreground text-background px-4 py-3`}>
          {["CANDIDATE", "APPLIED FOR", "DATE", "AI SCORE", "STATUS"].map(
            (h) => (
              <span key={h} className="font-heading text-xs font-bold">
                {h}
              </span>
            ),
          )}
          <span className="font-heading text-xs font-bold text-right">
            ACTIONS
          </span>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="p-12 text-center border-t-3 border-foreground">
            <p className="font-heading text-xl font-bold">
              NO APPLICATIONS FOUND
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-2">
              TRY ADJUSTING YOUR FILTERS
            </p>
          </div>
        ) : (
          filteredApplications.map((app) => (
            <div
              key={app.id}
              className={`${COLS} px-4 py-4 border-t-3 border-foreground items-center hover:bg-muted`}>
              <div className="min-w-0">
                <p className="font-heading text-sm font-bold truncate">
                  {app.candidateName}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground truncate">
                  {app.candidateEmail}
                </p>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs font-bold truncate">
                  {app.jobTitle}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground truncate">
                  {app.jobCompany}
                </p>
              </div>
              <p className="font-mono text-xs">{app.appliedDate}</p>
              <AiScore score={app.aiScore} size="sm" />
              <StatusBadge status={app.status} />
              <div className="flex gap-1 justify-end">
                <Link
                  href={`/dashboard/applications/${app.id}`}
                  aria-label={`View application from ${app.candidateName}`}
                  title="VIEW"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })}>
                  <Eye size={14} />
                </Link>
                {/* TODO: change status once the update action exists */}
                <Button
                  variant="ghost"
                  size="icon"
                  disabled
                  title="SHORTLIST (COMING SOON)"
                  aria-label={`Shortlist ${app.candidateName}`}>
                  <CheckCircle size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled
                  title="REJECT (COMING SOON)"
                  aria-label={`Reject ${app.candidateName}`}>
                  <XCircle size={14} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ApplicationsTable;
