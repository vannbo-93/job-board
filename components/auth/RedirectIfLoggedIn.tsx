/** @format */

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";

// Logged-in users don't need the login or signup page
async function RedirectIfLoggedIn() {
  const user = await getCurrentUser();
  if (!user) return null;
  redirect(user.role === "ADMIN" ? "/dashboard" : "/");
}

export default RedirectIfLoggedIn;
