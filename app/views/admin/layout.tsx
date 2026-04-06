"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { Topbar } from "@/components/admin/topbar";
import FloatingElements from "@/components/floating-elements";
import { authClient } from "@/lib/auth-client";
import Unauthorized from "@/components/global/Unauthorized";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#2e1a47]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!session) {
    return <Unauthorized />;
  }

  return (
    <div className="relative flex h-screen bg-linear-to-b from-[#2e1a47]/90 to-background text-foreground">
      {/* Background layer */}
      <FloatingElements />

      {/* Sidebar Drawer for mobile / fixed for desktop */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative z-10 bg-black/20 backdrop-blur-xs min-w-0">
        <Topbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbars-hidden overflow-hidden">
          <div className="mx-auto max-w-7xl relative w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
