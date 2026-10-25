/** @format */

import { useUsers } from "@/context/users/UsersContext";
import { AiScore } from "@/components/BrutalUI";

function UsersStats() {
  const { candidates, applications, avgScore } = useUsers();

  const stats = [
    {
      label: "TOTAL USERS",
      value: (
        <span className="font-mono text-3xl font-bold">
          {candidates.length}
        </span>
      ),
    },
    {
      label: "TOTAL APPLICATIONS",
      value: (
        <span className="font-mono text-3xl font-bold">
          {applications.length}
        </span>
      ),
    },
    { label: "AVG AI SCORE", value: <AiScore score={avgScore} /> },
  ];

  return (
    // pl/pt + negative margins on items = shared 3px borders at any column count
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 pl-[3px] pt-[3px]">
      {stats.map((stat) => (
        <div key={stat.label} className="-ml-[3px] -mt-[3px] brutal-border p-6">
          {stat.value}
          <p className="font-mono text-xs text-muted-foreground mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default UsersStats;
