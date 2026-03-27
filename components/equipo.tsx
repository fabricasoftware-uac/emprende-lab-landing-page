"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  image?: string;
  imageColor?: string;
}

interface EquipoProps {
  team?: TeamMember[];
}

export default function Equipo({ team = [] }: EquipoProps) {
  if (!team || team.length === 0) return null;
  return (
    <section id="equipo" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-4 block">
            Quiénes Somos
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Tripulación Estelar
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            El equipo de élite en control de mando que hace posible cada
            lanzamiento impulsando el ecosistema.
          </p>
        </motion.div>

        <div className="relative mx-auto w-full max-w-full pb-12 sm:px-12">
          <Carousel
            plugins={[
              Autoplay({ delay: 4500 })
            ]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 py-4">
              {team.map((member, idx) => (
                <CarouselItem key={idx} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="group h-full flex flex-col"
                  >
                    <div className="relative mb-6 rounded-3xl overflow-hidden aspect-3/4 glass p-1 grow">
                      <div
                        className={`w-full h-full rounded-[1.3rem] bg-linear-to-b from-[#050505] via-[#0a0a0b] to-[#121217] border border-white/5 relative overflow-hidden flex items-end justify-center pt-8 grow group/image`}
                      >
                        {/* Glow effect matching the role color in the background */}
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-linear-to-t ${member.imageColor} blur-[60px] opacity-30 mix-blend-screen z-0 group-hover:opacity-50 transition-opacity duration-500`}></div>

                        {/* Floating abstract reflection */}
                        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_40%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0)_60%)] -translate-x-full group-hover:animate-shimmer z-20"></div>
                        
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="absolute bottom-0 w-[95%] h-[95%] object-contain object-bottom z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] brightness-95 group-hover:brightness-110"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-black/40 backdrop-blur-md border border-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mb-8">
                            <span className="text-4xl text-white/50">👩‍🚀</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-center flex flex-col">
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-blue-400 mb-3 line-clamp-1">
                        {member.role}
                      </p>
                      <p className="text-foreground/60 text-sm leading-relaxed max-w-75 mx-auto line-clamp-3">
                        {member.desc}
                      </p>
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
