"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Linkedin, Twitter, ExternalLink, ChevronRight, Sparkles, UserCircle } from "lucide-react";
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

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  image?: string;
  imageColor?: string;
  linkedin?: string;
  twitter?: string;
}

interface EquipoProps {
  team?: TeamMember[];
}

export default function Equipo({ team = [] }: EquipoProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  if (!team || team.length === 0) return null;

  return (
    <section id="equipo" className="relative py-24 sm:py-32 overflow-hidden bg-background/50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>

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
            className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full"
          >
            NUESTRO EQUIPO
          </motion.span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-8 tracking-tight text-white">
            Tripulación <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient">Estelar</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            El equipo de élite en control de mando que hace posible cada lanzamiento impulsando el ecosistema.
          </p>
        </motion.div>

        <div className="relative mx-auto w-full max-w-full pb-12 sm:px-12">
          <Carousel
            plugins={[
              Autoplay({ delay: 6000 })
            ]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 py-4">
              {team.map((member, idx) => (
                <CarouselItem key={idx} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    onClick={() => setSelectedMember(member)}
                    className="group cursor-pointer h-120 flex flex-col relative rounded-4xl overflow-hidden bg-[#0A0C10]/80 border border-white/5 hover:border-blue-500/50 transition-all duration-700 backdrop-blur-3xl p-0 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] group"
                  >
                    {/* Background Tech elements */}
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay z-0"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-50"></div>
                    
                    {/* Corner Accents */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-blue-500/30 group-hover:border-blue-500 transition-colors z-20"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-blue-500/30 group-hover:border-blue-500 transition-colors z-20"></div>

                    {/* Image Section - The 'Profile Scan' */}
                    <div className="relative h-64 overflow-hidden bg-slate-950/40 m-4 rounded-3xl border border-white/5">
                      <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent z-10"></div>
                      
                      {/* Animated Scan Line */}
                      <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-blue-500/20 to-transparent -translate-y-full group-hover:animate-scan-line z-20 pointer-events-none"></div>

                      <div className={`absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-${member.imageColor ? "blue-500" : "blue-500"}/20 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 rounded-full`}></div>
                      
                      {member.image ? (
                        <div className="relative w-full h-full z-10 p-2">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-contain object-bottom transition-all duration-1000 group-hover:scale-105 filter grayscale-30 group-hover:grayscale-0"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center relative z-10">
                           <UserCircle size={100} className="text-white/5 group-hover:text-blue-400/10 transition-colors duration-700" />
                        </div>
                      )}

                      {/* Rank Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-30">
                        <div className="px-2 py-0.5 rounded-sm bg-slate-950/80 border border-blue-500/20 backdrop-blur-md">
                          <span className="text-[7px] font-black tracking-[0.3em] text-blue-400 uppercase">CORE_FLEET_UNIT</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                      </div>
                    </div>

                    {/* Metadata Section */}
                    <div className="px-8 pb-8 flex flex-col flex-1 relative z-10">
                      <div className="pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-10 h-0.5 bg-blue-500/40"></span>
                          <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.25em]">
                            {member.role}
                          </p>
                        </div>
                        <h3 className="text-3xl font-black text-white tracking-tighter mb-4 group-hover:text-blue-50 transition-colors">
                          {member.name.split(' ')[0]} <br/> 
                          <span className="text-blue-500/80 group-hover:text-blue-400 transition-colors uppercase italic text-2xl">{member.name.split(' ').slice(1).join(' ')}</span>
                        </h3>
                      </div>

                      {/* Technical Specs Footer */}
                      <div className="mt-auto space-y-4">
                        <div className="flex justify-between items-end">
                           <div className="space-y-1">
                              <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Access Level</p>
                              <div className="flex gap-1">
                                {[1,2,3,4,5].map(i => (
                                  <div key={i} className={`w-3 h-1 rounded-full ${i <= 4 ? "bg-blue-500/60" : "bg-white/5"}`}></div>
                                ))}
                              </div>
                           </div>
                           <div className="flex flex-col items-end">
                              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400/40 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-500 overflow-hidden relative">
                                <Sparkles size={18} className="relative z-10" />
                                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 animate-pulse"></div>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 border-white/10 bg-slate-900/50 backdrop-blur-md text-white hover:bg-blue-600 transition-all w-12 h-12 rounded-full" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 border-white/10 bg-slate-900/50 backdrop-blur-md text-white hover:bg-blue-600 transition-all w-12 h-12 rounded-full" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Member Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="md:min-w-200 lg:min-w-250 bg-slate-950/98 border-white/10 backdrop-blur-3xl text-white rounded-[2.5rem] p-0 overflow-hidden outline-hidden focus:ring-0">
          <AnimatePresence>
            {selectedMember && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-150"
              >
                {/* Modal Side: Image */}
                <div className="hidden md:flex md:w-1/3 relative bg-slate-900 overflow-hidden items-end justify-center shrink-0">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
                  <div className={`absolute bottom-0 w-64 h-64 bg-linear-to-t ${selectedMember.imageColor || "from-blue-600/30 to-indigo-600/30"} blur-[80px] opacity-40`}></div>
                  
                  <div className="relative w-full h-[80%] z-10 px-8">
                    {selectedMember.image ? (
                      <Image 
                        src={selectedMember.image} 
                        alt={selectedMember.name} 
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

                {/* Modal Side: Details */}
                <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col items-start relative bg-slate-950/50 overflow-y-auto custom-scrollbar">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold tracking-widest uppercase text-blue-400">
                      Tripulación
                    </div>
                  </div>

                  <DialogHeader className="mb-8 text-left p-0">
                    <DialogTitle className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 leading-none p-0">
                      {selectedMember.name}
                    </DialogTitle>
                    <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-xs">
                      {selectedMember.role}
                    </p>
                    <div className="h-1 w-20 bg-linear-to-r from-blue-500 to-transparent rounded-full mt-4"></div>
                  </DialogHeader>

                  <div className="space-y-8 flex-1 pr-2 w-full">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
                        <Sparkles size={14} className="text-blue-400" />
                        Trayectoria y Visión
                      </h4>
                      <div className="space-y-4">
                        {selectedMember.desc.split("\n").map((paragraph, pIdx) => (
                          <p key={pIdx} className="text-slate-300 text-lg leading-relaxed font-medium">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                      <div className="space-y-1">
                         <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Estado</h4>
                         <p className="text-sm font-bold text-blue-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                            Activo en Misión
                         </p>
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nivel</h4>
                         <p className="text-sm font-bold text-white/90">Especialista Élite</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4 w-full">
                   
                    <button 
                      onClick={() => setSelectedMember(null)}
                      className="flex-1 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all text-slate-400 hover:text-white"
                    >
                      Cerrar Perfil
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
