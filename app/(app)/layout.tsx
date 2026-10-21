/** @format */

import NavbarHeader from "@/components/navbar/NavbarHeader";
import NavbarFooter from "@/components/navbar/NavbarFooter";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavbarHeader />
      <main className="flex-1">{children}</main>
      <NavbarFooter />
    </div>
  );
}

export default AppLayout;
