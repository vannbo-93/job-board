/** @format */

import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useApplications } from "@/context/applications/ApplicationsContext";
import { StatusFilters } from "@/types";

const selectWrapper =
  "relative flex items-center brutal-border border-t-0 lg:border-t-3 lg:border-l-0";
const selectClass =
  "appearance-none bg-transparent font-mono text-xs font-bold pl-3 pr-9 py-3 outline-none cursor-pointer w-full";

function ApplicationsFilter() {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    jobFilter,
    setJobFilter,
    jobs,
  } = useApplications();

  return (
    <div className="mt-6 flex flex-col lg:flex-row">
      <div className="relative flex-1">
        <Search
          aria-hidden
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          aria-label="Search applications"
          placeholder="SEARCH BY NAME, EMAIL, ROLE..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className={selectWrapper}>
        <Filter
          aria-hidden
          size={14}
          className="ml-3 shrink-0 text-muted-foreground"
        />
        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={selectClass}>
          {StatusFilters.map((s) => (
            <option key={s} value={s}>
              {s === "ALL" ? "ALL STATUSES" : s}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          size={14}
          className="pointer-events-none absolute right-3 text-muted-foreground"
        />
      </div>

      <div className={`${selectWrapper} lg:max-w-64`}>
        <select
          aria-label="Filter by job"
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          className={selectClass}>
          <option value="ALL">ALL JOBS</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          size={14}
          className="pointer-events-none absolute right-3 text-muted-foreground"
        />
      </div>
    </div>
  );
}

export default ApplicationsFilter;
