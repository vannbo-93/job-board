/** @format */

import { Suspense } from "react";
import AdminSidebar from "@/components/navbar/AdminSidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      <Suspense
        fallback={<aside className="w-64 min-h-screen bg-foreground" />}>
        <AdminSidebar />
      </Suspense>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

export default DashboardLayout;
