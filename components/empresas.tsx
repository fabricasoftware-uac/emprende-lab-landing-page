"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User, Instagram, Globe, Sparkles, ChevronRight, LayoutGrid, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useState } from "react";
import { EmpresaCard, EmpresaModal, type Empresa } from "./empresa-ui";

interface EmpresaProps {
  empresas?: Empresa[];
}

export default function Empresas({ empresas }: EmpresaProps) {
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);

  if (!empresas) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-lg text-slate-400">Ups, no se pudo cargar las empresas</p>
    </div>
  );
  
  if (empresas.length === 0) return null;
  
  const tripuladas = empresas.filter((e) => !e.esAcelerada);
  const aceleradas = empresas.filter((e) => e.esAcelerada);
  const destacadas = [...tripuladas, ...aceleradas].slice(0, 6);

  return (
    <section id="empresas" className="relative py-24 sm:py-32 overflow-hidden bg-slate-950/20">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] -z-10 rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase bg-cyan-400/10 border border-cyan-400/20 rounded-full"
          >
            ECOSISTEMA EMPRENDELAB
          </motion.span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-8 tracking-tight text-white leading-none">
            Potenciando el <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 animate-gradient">Futuro</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Un vistazo a algunas de las increíbles empresas impulsadas por nuestro ecosistema de innovación y aceleración estratégica.
          </p>
        </motion.div>

        {/* --- CAROUSEL SECTION --- */}
        <div className="relative mx-auto mt-4 mb-16 sm:px-12 w-full max-w-full">
          <Carousel
            plugins={[
              Autoplay({ delay: 5000 }),
            ]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 py-4">
              {destacadas.map((empresa, idx) => (
                <CarouselItem key={idx} className="pl-6 basis-auto">
                  <EmpresaCard 
                    empresa={empresa} 
                    onClick={() => setSelectedEmpresa(empresa)} 
                    variant={empresa.esAcelerada ? "blue" : "cyan"} 
                  />
                </CarouselItem>
              ))}

              {/* View All Card */}
              <CarouselItem className="pl-6 basis-auto">
                <Link href="/empresas" className="block h-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="group relative flex flex-col items-center justify-center rounded-[2.5rem] p-8 border border-white/5 border-dashed hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-700 min-w-80 w-80 h-95 cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-xl group-hover:shadow-cyan-500/20">
                      <ArrowRight size={32} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="mt-6 text-center">
                      <span className="text-xl font-black text-slate-400 group-hover:text-white transition-colors tracking-tight">
                        Explorar Portafolio
                      </span>
                      <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest group-hover:text-cyan-400/80 transition-colors">
                        Ver todas las empresas
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </CarouselItem>
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 border-white/10 bg-slate-900/50 backdrop-blur-md text-white hover:bg-cyan-600 transition-all w-12 h-12 rounded-full" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 border-white/10 bg-slate-900/50 backdrop-blur-md text-white hover:bg-cyan-600 transition-all w-12 h-12 rounded-full" />
            </div>
          </Carousel>
        </div>

        <div className="flex flex-col items-center gap-6">
           <Link href="/empresas">
              <span className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-slate-950 font-black hover:bg-cyan-50 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/5">
                VER PORTAFOLIO COMPLETO <ArrowRight size={20} />
              </span>
           </Link>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles size={12} className="text-cyan-400" />
              Más de 20 empresas impulsadas
           </p>
        </div>
      </div>

      {/* Empresa Modal */}
      <EmpresaModal 
        empresa={selectedEmpresa} 
        onClose={() => setSelectedEmpresa(null)} 
      />
    </section>
  );
}
