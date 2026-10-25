/** @format */

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/context/users/UsersContext";

function UsersSearch() {
  const { search, setSearch } = useUsers();

  return (
    <div className="mt-6 relative">
      <Search
        aria-hidden
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        aria-label="Search users"
        placeholder="SEARCH BY NAME, EMAIL, CITY OR SKILL..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}

export default UsersSearch;
