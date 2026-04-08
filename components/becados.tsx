"use client";

import { motion } from "framer-motion";
import {
  UserCircle,
  Terminal,
  Palette,
  Briefcase,
  ChevronRight,
  Store,
  Sparkles,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";


interface Becados {
  nombre: string;
  rol: string;
  imagen?: string;
  desc: string;
  proyecto?: string;
  color?: string;
}

interface BecadosProps {
  becados?: Becados[];
}

const defaultIcons = [<Terminal size={18} key="1"/>, <Palette size={18} key="2"/>, <Briefcase size={18} key="3"/>];

export default function Becados({becados}: BecadosProps) {
  if (!becados || becados.length === 0) return null;

  return (
    <section id="becados" className="relative py-8 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-4 block">
            Mentores y Estudiantes
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">
              Talento Estelar (Becados)
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Conoce a los estudiantes brillantes que forman el corazón operativo
            de EmprendeLab, aportando su talento a misiones reales.
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="group relative h-full flex flex-col"
                  >
                   
                    
                    <div className="relative bg-[#0a0a0b] p-8 rounded-4xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-300 h-full flex flex-col z-10">
                      
                      {/* Top Accent Line */}
                      <div className={`absolute top-0 inset-x-0 h-1.5 bg-linear-to-r ${becado.color || "from-purple-500 to-pink-500"} opacity-80 group-hover:opacity-100 transition-opacity`}></div>

                      {/* Decorative Background Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-white/5 to-transparent rounded-bl-full -z-10 pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-white/5 to-transparent rounded-tr-full -z-10 pointer-events-none"></div>

                      {/* Avatar Section */}
                      <div className="relative w-28 h-28 mx-auto mb-6 shrink-0 mt-2">
                        {/* Ambient Glow */}
                        <div className={`absolute inset-0 bg-linear-to-tr ${becado.color || "from-purple-500 to-pink-500"} blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full`}></div>
                        
                        {/* Image Wrapper */}
                        <div className="relative w-full h-full rounded-full p-0.75 bg-linear-to-b from-white/20 to-transparent group-hover:from-white/40 transition-colors duration-500">
                          <div className="w-full h-full rounded-full overflow-hidden bg-[#050505] flex items-center justify-center relative">
                            {becado.imagen ? (
                              <Image 
                                src={becado.imagen} 
                                alt={becado.nombre}
fill
                                sizes="128px"
                                className="object-cover transition-all duration-700 group-hover:scale-115 group-hover:rotate-3"
                              />
                            ) : (
                              <div className="w-full h-full bg-linear-to-b from-white/5 to-transparent flex items-center justify-center">
                                <UserCircle size={48} strokeWidth={1.5} className="text-white/40" />
                              </div>
                            )}
                            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/50 pointer-events-none"></div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="text-center mt-2 grow flex flex-col items-center">
                        <h4 className="text-2xl font-black text-white mb-2 tracking-tight line-clamp-1">{becado.nombre}</h4>
                        
                        {/* Role Pill */}
                        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-transparent bg-clip-text bg-linear-to-r ${becado.color || "from-purple-400 to-pink-400"} mb-5 shadow-inner`}>
                          {becado.rol}
                        </div>

                        <p className="text-sm text-center text-slate-400 leading-relaxed mb-6 line-clamp-4">
                          {becado.desc}
                        </p>
                      </div>

                      {/* Footer Section */}
                      <div className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors shadow-[inset_0_1px_rgba(255,255,255,0.1)]">
                            <Store size={18} className="text-slate-300" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] uppercase font-black text-slate-500 tracking-wider">Proyecto</span>
                            <span className="text-sm font-bold text-slate-200 line-clamp-1 max-w-35">
                              {becado.proyecto || "EmprendeLab"}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 border-white/10 bg-[#0a0a0b] text-white hover:bg-white/10 z-20" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 border-white/10 bg-[#0a0a0b] text-white hover:bg-white/10 z-20" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
