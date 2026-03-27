"use client";

import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { aceleradas, tripuladas } from "../lib/data-empresas";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Empresas() {
  const destacadas = [...tripuladas, ...aceleradas].slice(0, 6);

  return (
    <section id="empresas" className="relative overflow-hidden bg-black/20">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] -z-10 rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase bg-cyan-400/10 border border-cyan-400/20 rounded-full">
            NUESTRAS EMPRESAS
          </span>
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
            Ecosistema <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Universidad </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Un vistazo a algunas de las increíbles empresas impulsadas por nuestro ecosistema de innovación.
          </p>
          
        </motion.div>

        {/* --- CAROUSEL SECTION --- */}
        <div className="relative mx-auto mt-4 mb-8 sm:px-12 w-full max-w-full">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3500,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 py-4">
              {destacadas.map((empresa, idx) => (
                <CarouselItem key={idx} className="pl-6 basis-auto">
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative bg-[#0a0a0b] border border-white/5 rounded-2xl p-6 hover:bg-white/5 hover:border-cyan-500/30 transition-all duration-300 flex flex-col min-w-75 w-75 sm:min-w-75 sm:w-75 h-full"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 relative shrink-0 flex items-center justify-center rounded-xl bg-cyan-500/5 border border-cyan-500/10 group-hover:bg-cyan-500/10 transition-colors">
                        {empresa.logo ? (
                          <Image 
                            src={empresa.logo} 
                            alt={empresa.name} 
                            fill 
                            className="object-contain p-2 opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <div className="text-cyan-400/80 group-hover:text-cyan-400 transition-colors">
                            {empresa.icon}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                          {empresa.name}
                        </h4>
                        <span className="text-[10px] text-cyan-400/60 uppercase font-black tracking-wider">
                          {empresa.category}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors mb-6 grow line-clamp-3">
                      {empresa.desc}
                    </p>

                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5">
                      <User size={14} className="text-cyan-400/50" />
                      <span className="text-xs text-slate-400">
                        Dirigida por <span className="text-slate-200 font-medium">{empresa.encargado}</span>
                      </span>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}

              {/* View All Card */}
              <CarouselItem className="pl-6 basis-auto">
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group relative flex items-center justify-center rounded-2xl p-6 border border-white/5 border-dashed hover:border-cyan-500/30 transition-all duration-300 min-w-75 w-75 h-full cursor-pointer"
                >
                  <Link href="/empresas" className="absolute inset-0 z-10" aria-label="Ver todas las empresas"></Link>
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-all">
                      <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors">
                      Ver todas las <br/> {tripuladas.length + aceleradas.length} empresas
                    </span>
                  </div>
                </motion.div>
              </CarouselItem>
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 border-white/10 bg-[#0a0a0b] text-white hover:bg-white/10 z-20" />
              <CarouselNext className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 border-white/10 bg-[#0a0a0b] text-white hover:bg-white/10 z-20" />
            </div>
          </Carousel>
        </div>
        <Link href="/empresas">
            <span className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-slate-200 hover:scale-105 transition-all mx-auto">
              Conócelas <ArrowRight size={20} />
            </span>
        </Link>
      </div>
    </section>
  );
}
