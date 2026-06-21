"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Store, UserCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface BecadoModalData {
  nombre: string;
  rol: string;
  imagen?: string;
  desc: string;
  proyecto?: string;
  color?: string;
  programa?: string;
  posicionImagen?: string;
}

interface BecadoModalProps {
  becado: BecadoModalData | null;
  onClose: () => void;
}

export function BecadoModal({ becado, onClose }: BecadoModalProps) {
  if (!becado) return null;

  return (
    <Dialog open={!!becado} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="md:min-w-200 lg:min-w-250 bg-slate-950/98 border-white/10 backdrop-blur-3xl text-white rounded-[2.5rem] p-0 overflow-hidden outline-hidden focus:ring-0">
        <AnimatePresence>
          <motion.div
            key={becado.nombre}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-150"
          >
            {/* Image side */}
            <div className="w-1/3 hidden md:flex md:relative bg-slate-900 overflow-y-auto items-center justify-center p-12 shrink-0">
              <div
                className={`absolute inset-0 bg-linear-to-br ${becado.color || "from-purple-500/20 to-pink-500/20"} opacity-30`}
              />
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                {becado.imagen ? (
                  <Image
                    src={becado.imagen}
                    alt={becado.nombre}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: becado.posicionImagen || "center center",
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <UserCircle size={80} className="text-white/10" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                    <Store size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      En Misión con
                    </p>
                    <p className="text-sm font-black text-white">
                      {becado.proyecto || "EmprendeLab"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details side */}
            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col items-start relative overflow-auto bg-slate-950/50">
              <div className="mb-8">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-transparent bg-clip-text bg-linear-to-r ${becado.color || "from-purple-400 to-pink-400"}`}
                >
                  Nuestros becados
                </div>
              </div>

              <DialogHeader className="mb-8 text-left p-0">
                <DialogTitle className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 leading-none p-0">
                  {becado.nombre}
                </DialogTitle>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
                  {becado.rol}
                </p>
                <div
                  className={`h-1 w-20 bg-linear-to-r ${becado.color || "from-purple-500 to-pink-500"} rounded-full mt-4`}
                />
              </DialogHeader>

              <div className="space-y-8 flex-1 pr-2 w-full">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
                    <Sparkles size={14} className="text-purple-400" />
                    Perfil y Contribución
                  </h4>
                  <div className="space-y-4">
                    {becado.desc.split("\n").map((paragraph, pIdx) => (
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
                      Rol
                    </h4>
                    <p className="text-sm font-bold text-white/90">
                      {becado.rol}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Programa
                    </h4>
                    <p className="text-sm font-bold text-purple-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      {becado.programa}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex gap-4 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 px-8 py-4 rounded-2xl bg-white text-indigo-950 font-black hover:bg-slate-100 transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
