/** @format */

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/amazing-jobs")) {
    return NextResponse.redirect(new URL("/jobs", request.url));
  }

  const isAdminHost = host.startsWith("admin.");
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname === "/login";

  // Admin subdomain: only the dashboard and the login page
  if (isAdminHost && !isDashboard && !isLogin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Public site: no dashboard
  if (!isAdminHost && isDashboard) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isDashboard) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Logged in but not an admin: stop here, don't redirect (avoids loops)
    if (token.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)"],
};
