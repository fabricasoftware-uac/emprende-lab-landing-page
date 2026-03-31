"use client";

import { LogOut, Bell, User as UserIcon, Menu, Loader2, AlertTriangle, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface TopbarProps {
  onMenuToggle?: () => void;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { data: session } = authClient.useSession();

  // Format the breadcrumb name based on the path
  const getPageTitle = () => {
    if (pathname === "/views/admin") return "Dashboard";
    if (pathname === "/views/fabrica") return "Fabrica Core";
    const segment = pathname.split("/").pop() || "";
    // capitalize and replace hyphens if any
    return (
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    );
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      toast.success("Sesión cerrada correctamente");
      setShowConfirm(false);
      router.push("/auth/login");
    } catch (error) {
      toast.error("Error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">
              {session?.user?.name || "Usuario"}
            </p>
            <p className="text-xs text-purple-300/60">
              {session?.user?.email || ""}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <UserIcon className="w-5 h-5" />
          </div>
        </div>

        <button
          onClick={() => setShowConfirm(true)}
          className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all border border-red-500/20"
          title="Cerrar Sessión"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1a0f2e] border border-purple-500/20 shadow-2xl rounded-2xl p-6 w-full max-w-sm relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-red-500/10 to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={loading}
                  className="text-purple-300/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2 relative z-10">Cerrar Sesión</h3>
              <p className="text-sm text-purple-200/70 mb-8 relative z-10">
                ¿Estás seguro que deseas cerrar sesión y salir del panel?
              </p>

              <div className="flex gap-3 w-full relative z-10">
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-purple-500/30 text-white font-medium hover:bg-white/5 transition-all text-sm disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all text-sm disabled:opacity-70 disabled:bg-red-500/50 shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Sí, Salir"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
