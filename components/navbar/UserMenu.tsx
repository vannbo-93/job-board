/** @format */

import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import LogoutButton from "./LogoutButton";

const buttonClass =
  "brutal-border px-5 py-2 font-heading text-sm font-bold hover:bg-foreground hover:text-background transition-none";

async function UserMenu() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex items-center">
        <Link href="/login" className={buttonClass}>
          LOGIN
        </Link>
        <Link
          href="/signup"
          className={`${buttonClass} border-l-0 bg-accent text-accent-foreground`}>
          SIGN UP
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Link
        href="/profile"
        className={`${buttonClass} max-w-48 truncate`}
        title={user.email}>
        {user.name.toUpperCase()}
      </Link>
      <LogoutButton className={`${buttonClass} border-l-0`} />
    </div>
  );
}

export default UserMenu;
