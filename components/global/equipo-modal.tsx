"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, UserCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface EquipoModalData {
  name: string;
  role: string;
  desc: string;
  image?: string;
  imageColor?: string;
}

interface EquipoModalProps {
  member: EquipoModalData | null;
  onClose: () => void;
}

export function EquipoModal({ member, onClose }: EquipoModalProps) {
  if (!member) return null;

  return (
    <Dialog open={!!member} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="md:min-w-200 lg:min-w-250 bg-slate-950/98 border-white/10 backdrop-blur-3xl text-white rounded-[2.5rem] p-0 overflow-hidden outline-hidden focus:ring-0">
        <AnimatePresence>
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-150"
          >
            {/* Image side */}
            <div className="hidden md:flex md:w-1/3 relative bg-slate-900 overflow-hidden items-end justify-center shrink-0">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-transparent" />
              <div
                className={`absolute bottom-0 w-64 h-64 bg-linear-to-t ${member.imageColor || "from-blue-600/30 to-indigo-600/30"} blur-[80px] opacity-40`}
              />
              <div className="relative w-full h-[80%] z-10 px-8">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain object-bottom drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserCircle size={120} className="text-white/10" />
                  </div>
                )}
              </div>
            </div>

            {/* Details side */}
            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col items-start relative bg-slate-950/50 overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold tracking-widest uppercase text-blue-400">
                  Tripulación
                </div>
              </div>

              <DialogHeader className="mb-8 text-left p-0">
                <DialogTitle className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 leading-none p-0">
                  {member.name}
                </DialogTitle>
                <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-xs">
                  {member.role}
                </p>
                <div className="h-1 w-20 bg-linear-to-r from-blue-500 to-transparent rounded-full mt-4" />
              </DialogHeader>

              <div className="space-y-8 flex-1 pr-2 w-full">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
                    <Sparkles size={14} className="text-blue-400" />
                    Trayectoria y Visión
                  </h4>
                  <div className="space-y-4">
                    {member.desc.split("\n").map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-slate-300 text-lg leading-relaxed font-medium"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Estado
                    </h4>
                    <p className="text-sm font-bold text-blue-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      Activo en Misión
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Nivel
                    </h4>
                    <p className="text-sm font-bold text-white/90">
                      Especialista Élite
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all text-slate-400 hover:text-white"
                >
                  Cerrar Perfil
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
