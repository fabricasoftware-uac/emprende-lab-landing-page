"use client";

import { useState } from "react";
import { UsersManager } from "@/components/fabrica/users-manager";
import { ProjectsManager } from "@/components/fabrica/projects-manager";
import { CollectionsManager } from "@/components/fabrica/collections-manager";
import { RecordsManager } from "@/components/fabrica/records-manager";
import {
  LogOut,
  Rocket,
  Shield,
  FolderGit2,
  Layers,
  Database,
} from "lucide-react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FloatingElements from "@/components/floating-elements";
export default function FabricaPage() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
  const [activeTab, setActiveTab] = useState("proyectos");
  const router = useRouter();

  const handleLogout = () => {
    pb.authStore.clear();
    toast.success("Sesión cerrada");
    router.push("/auth/login");
  };

  const tabs = [
    {
      id: "proyectos",
      label: "Proyectos",
      icon: FolderGit2,
      component: ProjectsManager,
    },
    {
      id: "configuraciones",
      label: "Colecciones",
      icon: Layers,
      component: CollectionsManager,
    },
    {
      id: "registros",
      label: "Registros",
      icon: Database,
      component: RecordsManager,
    },
    {
      id: "usuarios",
      label: "Usuarios",
      icon: Shield,
      component: UsersManager,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0514] text-white overflow-hidden flex flex-col relative font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <FloatingElements />
      </div>

      {/* Top Navbar */}
      <header className="relative z-10 glass border-b border-purple-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-indigo-400">
              Panel Fábrica
            </h1>
            <p className="text-xs text-purple-200/60 font-mono">
              EmprendeLab Core Engine
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-purple-200 transition-colors border border-purple-500/20 text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Salir
        </button>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-2 p-1 glass rounded-2xl border border-purple-500/20 w-fit shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-purple-500/20 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)] border border-purple-500/30"
                      : "text-purple-200/50 hover:text-purple-200 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? "opacity-100" : "opacity-50"}`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="mt-8">
            {tabs.map((tab) => {
              const Component = tab.component;
              if (activeTab !== tab.id) return null;
              return <Component key={tab.id} />;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
