/** @format */

import { useMemo } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import type { Application } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { AiScore, StatusBadge } from "@/components/BrutalUI";
import { useUsers } from "@/context/users/UsersContext";

function averageScore(apps: Application[]) {
  const scored = apps.filter((a) => a.aiScore > 0);
  if (scored.length === 0) return 0;
  return (
    Math.round(
      (scored.reduce((s, a) => s + a.aiScore, 0) / scored.length) * 10,
    ) / 10
  );
}

const ROW = "grid grid-cols-[auto_2fr_2fr_1fr_1fr_auto] gap-4 items-center";
const APP_ROW = "grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center";

function UsersList() {
  const {
    filteredCandidates,
    applications,
    expandedUser,
    setExpandedUser,
    jobs,
  } = useUsers();

  // Group applications by candidate once, instead of filtering for every row
  const appsByCandidate = useMemo(() => {
    const map = new Map<string, Application[]>();
    for (const app of applications) {
      const list = map.get(app.candidateId) ?? [];
      list.push(app);
      map.set(app.candidateId, list);
    }
    return map;
  }, [applications]);

  if (filteredCandidates.length === 0) {
    return (
      <div className="mt-6 brutal-border p-12 text-center">
        <User aria-hidden size={32} className="mx-auto text-muted-foreground" />
        <p className="font-heading text-xl font-bold mt-4">NO USERS FOUND</p>
        <p className="font-mono text-xs text-muted-foreground mt-2">
          TRY A DIFFERENT SEARCH
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <div className="min-w-[760px]">
        {filteredCandidates.map((user) => {
          const userApps = appsByCandidate.get(user.id) ?? [];
          const isOpen = expandedUser === user.id;
          const panelId = `user-apps-${user.id}`;

          return (
            <div
              key={user.id}
              className="brutal-border border-b-0 last:border-b-3">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setExpandedUser(isOpen ? null : user.id)}
                className={`w-full ${ROW} px-6 py-5 text-left hover:bg-muted`}>
                <div
                  aria-hidden
                  className="w-10 h-10 brutal-border bg-foreground text-background flex items-center justify-center font-heading text-sm font-bold">
                  {user.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <p className="font-heading text-sm font-bold truncate">
                    {user.name}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground flex items-center gap-1 truncate">
                    <Mail aria-hidden size={10} className="shrink-0" />{" "}
                    {user.email}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-mono text-xs">
                    <Briefcase
                      aria-hidden
                      size={12}
                      className="text-muted-foreground"
                    />
                    {userApps.length} APP{userApps.length !== 1 ? "S" : ""}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px]">
                    <MapPin
                      aria-hidden
                      size={12}
                      className="text-muted-foreground"
                    />
                    {user.location}
                  </span>
                </div>

                <AiScore score={averageScore(userApps)} size="sm" />

                <p className="font-mono text-xs text-muted-foreground">
                  {user.experience}
                </p>

                <ChevronRight
                  aria-hidden
                  size={14}
                  className={isOpen ? "rotate-90" : ""}
                />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  className="border-t-3 border-foreground bg-muted">
                  <div className={`${APP_ROW} px-6 py-2 bg-foreground/5`}>
                    {["JOB", "DATE", "SCORE", "STATUS", "VIEW"].map((h) => (
                      <span
                        key={h}
                        className="font-heading text-[10px] font-bold text-muted-foreground">
                        {h}
                      </span>
                    ))}
                  </div>

                  {userApps.length === 0 ? (
                    <p className="px-6 py-4 text-center font-mono text-xs text-muted-foreground">
                      NO APPLICATIONS YET
                    </p>
                  ) : (
                    userApps.map((app) => {
                      const job = jobs.find((j) => j.id === app.jobId);
                      return (
                        <div
                          key={app.id}
                          className={`${APP_ROW} px-6 py-3 border-t border-foreground/20`}>
                          <div className="min-w-0">
                            <p className="font-mono text-xs font-bold truncate">
                              {job?.title ?? app.jobTitle}
                            </p>
                            <p className="font-mono text-[10px] text-muted-foreground truncate">
                              {job?.company ?? app.jobCompany}
                            </p>
                          </div>
                          <p className="font-mono text-xs">{app.appliedDate}</p>
                          <AiScore score={app.aiScore} size="sm" />
                          <StatusBadge status={app.status} />
                          <Link
                            href={`/dashboard/applications/${app.id}`}
                            title="VIEW DETAILS"
                            aria-label={`View application for ${app.jobTitle}`}
                            className={buttonVariants({
                              variant: "ghost",
                              size: "icon",
                            })}>
                            <ArrowUpRight size={14} />
                          </Link>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UsersList;
