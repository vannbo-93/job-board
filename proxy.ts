/** @format */

import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  console.log("Request:", host, pathname);

  // القاعدة 1: الرابط القديم
  if (pathname.startsWith("/amazing-jobs")) {
    return NextResponse.redirect(new URL("/jobs", request.url));
  }

  // القاعدة 2: فصل الأدمن عن الموقع العام
  const isAdminHost = host.startsWith("admin.");
  const isDashboard = pathname.startsWith("/dashboard");

  if (isAdminHost && !isDashboard) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAdminHost && isDashboard) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
