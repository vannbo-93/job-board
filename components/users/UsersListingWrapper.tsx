/** @format */

"use client";

import type { Application, Candidate, Job } from "@/types";
import UsersProvider from "@/context/users/UsersProvider";
import UsersStats from "./UsersStats";
import UsersSearch from "./UsersSearch";
import UsersList from "./UsersList";

type Props = {
  jobs: Job[];
  applications: Application[];
  candidates: Candidate[];
};

function UsersListingWrapper({ jobs, applications, candidates }: Props) {
  return (
    <UsersProvider
      jobs={jobs}
      applications={applications}
      candidates={candidates}>
      <UsersStats />
      <UsersSearch />
      <UsersList />
    </UsersProvider>
  );
}

export default UsersListingWrapper;
