"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Building2,
  Settings,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/views/admin", icon: LayoutDashboard },
  {
    name: "Tripulación Estelar",
    href: "/views/admin/tripulacion",
    icon: Users,
  },
  { name: "Becados", href: "/views/admin/becados", icon: GraduationCap },
  { name: "Empresas", href: "/views/admin/empresas", icon: Building2 },
];

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <div
        className={`
        fixed md:relative z-40 w-64 h-full bg-[#1a0f2e]/90 md:bg-[#1a0f2e]/80 backdrop-blur-xl border-r border-purple-500/20 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-blue-400">
            Admin Control
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 relative group
                  ${
                    isActive
                      ? "bg-purple-500/10 text-purple-300 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]"
                      : "text-purple-100/60 hover:text-purple-200 hover:bg-white/5"
                  }
                `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-8 bg-purple-500 rounded-r-full shadow-[0_0_10px_#a855f7]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "text-purple-400" : "group-hover:text-purple-300"}`}
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-100/60 hover:text-purple-200 hover:bg-white/5 transition-all cursor-pointer">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Configuración</span>
          </div>
        </div>
      </div>
    </>
  );
}
