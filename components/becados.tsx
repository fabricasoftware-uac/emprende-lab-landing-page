"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle,
  Terminal,
  Palette,
  Briefcase,
  ChevronRight,
  Store,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Becado {
  nombre: string;
  rol: string;
  imagen?: string;
  desc: string;
  proyecto?: string;
  color?: string;
  programa?: string;
}

interface BecadosProps {
  becados?: Becado[];
}

export default function Becados({ becados = [] }: BecadosProps) {
  const [selectedBecado, setSelectedBecado] = useState<Becado | null>(null);

  if (!becados || becados.length === 0) return null;

  return (
    <section id="becados" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] text-purple-400 uppercase bg-purple-400/10 border border-purple-400/20 rounded-full"
          >
            TALENTO EMPRENDELAB
          </motion.span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-8 tracking-tight text-white">
            Nuestros <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 animate-gradient">Becados</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Conoce a los estudiantes brillantes que forman el corazón operativo de EmprendeLab, aportando su talento a misiones reales.
          </p>
        </motion.div>

        <div className="relative mx-auto w-full max-w-full pb-12 sm:px-12">
          <Carousel
            plugins={[
              Autoplay({ delay: 5000 })
            ]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 py-4">
              {becados.map((becado, idx) => (
                <CarouselItem key={idx} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    onClick={() => setSelectedBecado(becado)}
                    className="group cursor-pointer h-full flex flex-col relative rounded-[2.5rem] overflow-hidden bg-slate-900/40 border border-white/5 hover:border-purple-500/30 transition-all duration-700 backdrop-blur-xl p-8 hover:shadow-[0_20px_80px_-20px_rgba(168,85,247,0.15)]"
                  >
                    <div className="relative w-24 h-24 mb-8">
                      <div className={`absolute inset-0 bg-linear-to-tr ${becado.color || "from-purple-500 to-pink-500"} blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-700 rounded-full`}></div>
                      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#050505] border border-white/10 group-hover:border-purple-500/50 transition-colors duration-500">
                        {becado.imagen ? (
                          <Image 
                            src={becado.imagen} 
                            alt={becado.nombre}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-115"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-white/5">
                            <UserCircle size={40} className="text-white/20" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                       <h4 className="text-xl font-bold text-white tracking-tight line-clamp-1 group-hover:text-purple-300 transition-colors">
                        {becado.nombre}
                       </h4>
                       <div className={`inline-flex py-1 text-[9px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r ${becado.color || "from-purple-400 to-pink-400"}`}>
                          {becado.rol}
                       </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <Store size={14} className="text-slate-500" />
                          <span className="text-[10px] font-bold text-slate-400 truncate max-w-24">
                            {becado.proyecto || "EmprendeLab"}
                          </span>
                       </div>
                       <ChevronRight size={14} className="text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 border-white/10 bg-slate-900/50 backdrop-blur-md text-white hover:bg-purple-600 transition-all w-12 h-12 rounded-full" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 border-white/10 bg-slate-900/50 backdrop-blur-md text-white hover:bg-purple-600 transition-all w-12 h-12 rounded-full" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Becado Modal */}
      <Dialog open={!!selectedBecado} onOpenChange={() => setSelectedBecado(null)}>
        <DialogContent className="md:min-w-200 lg:min-w-250 bg-slate-950/98 border-white/10 backdrop-blur-3xl text-white rounded-[2.5rem] p-0 overflow-hidden outline-hidden focus:ring-0">
          <AnimatePresence>
            {selectedBecado && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-150"
              >
                {/* Modal Side: Image/Profile */}
                <div className="hidden md:flex md:w-1/3 relative bg-slate-900 items-center justify-center p-12 shrink-0">
                  <div className={`absolute inset-0 bg-linear-to-br ${selectedBecado.color || "from-purple-500/20 to-pink-500/20"} opacity-30`}></div>
                  
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                    {selectedBecado.imagen ? (
                      <Image 
                        src={selectedBecado.imagen} 
                        alt={selectedBecado.nombre} 
                        fill
                        className="object-cover" 
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
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">En Misión con</p>
                          <p className="text-sm font-black text-white">{selectedBecado.proyecto || "EmprendeLab"}</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Modal Side: Details */}
                <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col items-start relative overflow-auto bg-slate-950/50">
                  <div className="mb-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-transparent bg-clip-text bg-linear-to-r ${selectedBecado.color || "from-purple-400 to-pink-400"}`}>
                      Nuestros becados
                    </div>
                  </div>

                  <DialogHeader className="mb-8 text-left p-0">
                    <DialogTitle className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 leading-none p-0">
                      {selectedBecado.nombre}
                    </DialogTitle>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">
                      {selectedBecado.rol}
                    </p>
                    <div className={`h-1 w-20 bg-linear-to-r ${selectedBecado.color || "from-purple-500 to-pink-500"} rounded-full mt-4`}></div>
                  </DialogHeader>

                  <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar w-full">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
                        <Sparkles size={14} className="text-purple-400" />
                        Perfil y Contribución
                      </h4>
                      <p className="text-slate-300 text-lg leading-relaxed font-medium">
                        {selectedBecado.desc}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                      <div className="space-y-1">
                         <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rol</h4>
                         <p className="text-sm font-bold text-white/90">{selectedBecado.rol}</p>
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Programa</h4>
                         <p className="text-sm font-bold text-purple-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
                            {selectedBecado.programa}
                         </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 flex gap-4 w-full">
                    <button 
                      onClick={() => setSelectedBecado(null)}
                      className="flex-1 px-8 py-4 rounded-2xl bg-white text-indigo-950 font-black hover:bg-slate-100 transition-all shadow-xl hover:scale-105 active:scale-95"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
