/** @format */

"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

function LogoutButton({ className }: { className?: string }) {
  const [isPending, setIsPending] = useState(false);

  return (
    <button
      type="button"
      className={className}
      disabled={isPending}
      onClick={() => {
        setIsPending(true);
        signOut({ callbackUrl: "/" });
      }}>
      {isPending ? "..." : "LOGOUT"}
    </button>
  );
}

export default LogoutButton;
