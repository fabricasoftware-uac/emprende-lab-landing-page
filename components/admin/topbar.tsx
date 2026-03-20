"use client";

import { LogOut, Bell, User as UserIcon, Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import PocketBase from "pocketbase";

interface TopbarProps {
  onMenuToggle?: () => void;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Format the breadcrumb name based on the path
  const getPageTitle = () => {
    if (pathname === "/views/admin") return "Dashboard";
    const segment = pathname.split("/").pop() || "";
    // capitalize and replace hyphens if any
    return (
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    );
  };

  const handleLogout = () => {
    setLoading(true);
    // Even though backend logic isn't heavily needed, we can clear the PB auth store
    const pb = new PocketBase("http://localhost:8000");
    pb.authStore.clear();
    router.push("/auth/login");
  };

  return (
    <div className="h-20 w-full bg-[#1a0f2e]/80 backdrop-blur-md border-b border-purple-500/20 flex items-center justify-between px-4 sm:px-8 relative z-20 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 -ml-2 text-purple-200/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-wide truncate">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-purple-200/60 hover:text-purple-300 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></span>
        </button>

        <div className="h-8 w-px bg-purple-500/20"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Admin EmprendeLab</p>
            <p className="text-xs text-purple-300/60">admin@emprendelab.com</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <UserIcon className="w-5 h-5" />
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all border border-red-500/20 disabled:opacity-50"
          title="Cerrar Sessión"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
