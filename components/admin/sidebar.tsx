"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Layers,
  Database,
  Shield,
  Rocket,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const fabricaNavItems = [
  { name: "Usuarios", href: "/views/fabrica/usuarios", icon: Shield },
  { name: "Proyectos", href: "/views/fabrica", icon: FolderGit2 },
  { name: "Colecciones", href: "/views/fabrica/colecciones", icon: Layers },
  { name: "Registros", href: "/views/fabrica/registros", icon: Database },
];

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const role = session?.user?.role || "user";

  const [esquemasNavItems, setEsquemasNavItems] = useState<
    { name: string; href: string; icon: any }[]
  >([]);

  useEffect(() => {
    if (role === "user") {
      const fetchMenu = async () => {
        try {
          // Get the user's project
          const resProj = await fetch("/api/proyectos");
          const dataProj = await resProj.json();
          const userProject = dataProj.data?.[0]; // Assuming user has at least 1 project

          if (userProject) {
            // Get schemas for the project
            const resEsq = await fetch(
              `/api/esquemas?proyectoId=${userProject.id}`,
            );
            const dataEsq = await resEsq.json();

            if (dataEsq.data) {
              const items = dataEsq.data.map((esq: any) => ({
                name: esq.nombre,
                href: `/views/admin/${userProject.slug}/${esq.slug}`,
                icon: FileText,
              }));
              setEsquemasNavItems([
                {
                  name: "Dashboard",
                  href: "/views/admin",
                  icon: LayoutDashboard,
                },
                ...items,
              ]);
            }
          }
        } catch (error) {
          console.error("Error fetching dynamic sidebar menu", error);
        }
      };
      fetchMenu();
    }
  }, [role]);

  const navItems = role === "admin" ? fabricaNavItems : esquemasNavItems;
  const panelName = role === "admin" ? "Admin Control" : "Panel Cliente";

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
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-indigo-400">
            {panelName}
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl flex-shrink-0 cursor-pointer transition-all duration-300 relative group
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
                  <span className="font-medium text-sm truncate">
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
