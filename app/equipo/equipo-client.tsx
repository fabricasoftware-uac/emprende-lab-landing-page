"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UserCircle, ChevronRight } from "lucide-react";
import { useState } from "react";
import { EquipoModal } from "@/components/global/equipo-modal";

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  image?: string;
  imageColor?: string;
}

interface EquipoGridProps {
  team: TeamMember[];
}

export default function EquipoGrid({ team }: EquipoGridProps) {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
            Tripulación Estelar
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-white">
            Nuestro{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-indigo-400">
              Equipo
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            El talento que impulsa EmprendeLab hacia nuevas fronteras.
          </p>
        </motion.div>

        {team.length === 0 ? (
          <p className="text-center text-slate-500 py-20">
            No hay miembros registrados aún.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setSelected(m)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-[#0D0512]/60 border border-white/5 hover:border-blue-500/50 transition-all duration-500 p-6 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]"
              >
                <div className="relative w-full aspect-square mb-5 overflow-hidden rounded-xl bg-slate-950 border border-white/5">
                  {m.image ? (
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <UserCircle size={64} className="text-white/10" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                    {m.role}
                  </p>
                </div>
                <h2 className="text-xl font-black text-white mb-1">{m.name}</h2>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                  {m.desc}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center justify-end">
                  <ChevronRight
                    size={16}
                    className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <EquipoModal member={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
