"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Terminal, UserCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { BecadoModal } from "@/components/global/becado-modal";

interface Becado {
  nombre: string;
  rol: string;
  imagen?: string;
  desc: string;
  proyecto?: string;
  color?: string;
  programa?: string;
  posicionImagen?: string;
}

interface BecadosGridProps {
  becados: Becado[];
}

export default function BecadosGrid({ becados }: BecadosGridProps) {
  const [selected, setSelected] = useState<Becado | null>(null);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] text-purple-400 uppercase bg-purple-400/10 border border-purple-400/20 rounded-full">
            Talento EmprendeLab
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-white">
            Nuestros{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-orange-400">
              Becados
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Conoce a los estudiantes que forman el corazón operativo de
            EmprendeLab.
          </p>
        </motion.div>

        {becados.length === 0 ? (
          <p className="text-center text-slate-500 py-20">
            No hay becados registrados aún.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {becados.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setSelected(b)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-[#0D0512]/60 border border-white/5 hover:border-purple-500/50 transition-all duration-500 p-6 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]"
              >
                <div className="relative w-full aspect-square mb-5 overflow-hidden rounded-xl bg-slate-950 border border-white/5">
                  {b.imagen ? (
                    <Image
                      src={b.imagen}
                      alt={b.nombre}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      style={{
                        objectPosition: b.posicionImagen || "center center",
                      }}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <UserCircle size={64} className="text-white/10" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
                    {b.rol}
                  </p>
                </div>
                <h2 className="text-xl font-black text-white mb-1">
                  {b.nombre}
                </h2>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                  {b.desc}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Terminal size={12} />
                    {b.proyecto || "EmprendeLab"}
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BecadoModal becado={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
