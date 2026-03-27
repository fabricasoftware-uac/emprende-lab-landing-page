"use client";

import { motion } from "framer-motion";
import {
  UserCircle,
  Terminal,
  Palette,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const becados = [
  {
    name: "Valentina Soler",
    role: "Frontend Developer",
    project: "ProApoyo / PopayánInn",
    icon: <Terminal />,
    color: "from-blue-400 to-cyan-400",
    desc: "Desarrolladora principal enfocada en crear interfaces de usuario accesibles y modernas.",
    image: "",
  },
  {
    name: "Mateo Rivas",
    role: "UX/UI Designer",
    project: "Fundación Mundo Mujer",
    icon: <Palette />,
    color: "from-pink-400 to-purple-400",
    desc: "Diseñador creativo, experto en flujos de usuario y prototipado espacial.",
    image: "",
  },
  {
    name: "Carmen Torres",
    role: "Project Manager",
    project: "Agencia InnHouse",
    icon: <Briefcase />,
    color: "from-orange-400 to-yellow-400",
    desc: "Líder de equipo y facilitadora ágil que asegura la gestión óptima de los recursos.",
    image: "",
  },
  {
    name: "Julian Paz",
    role: "Backend Engineer",
    project: "Bantotal Integration",
    icon: <Terminal />,
    color: "from-teal-400 to-emerald-400",
    desc: "Especialista en arquitecturas escalables y bases de datos relacionales.",
    image: "",
  },
];

export default function Becados() {
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
                    className="glass p-6 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 h-full flex flex-col"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-white/5 to-transparent rounded-bl-full -z-10"></div>

                    {/* Avatar placeholder / Cutout Image */}
                    <div className="flex justify-center mb-6 shrink-0 relative h-32 w-full mt-4">
                      {/* Glow effect matching the role color in the background */}
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-linear-to-t ${becado.color} blur-[30px] opacity-40 mix-blend-screen z-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                      
                      {becado.image ? (
                        <img 
                           src={becado.image} 
                           alt={becado.name}
                           className="absolute bottom-0 w-full h-[140%] object-contain object-bottom z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.08)] brightness-95 group-hover:brightness-110"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-300">
                          <div
                            className={`absolute inset-0 bg-linear-to-br ${becado.color} opacity-20 rounded-full`}
                          ></div>
                          <UserCircle
                            size={64}
                            strokeWidth={1}
                            className="text-white/60 mx-auto"
                          />
                        </div>
                      )}
                    </div>

                    <div className="text-center text-white mb-6">
                      <h4 className="text-xl font-bold mb-1">{becado.name}</h4>
                      <div
                        className={`text-sm font-semibold bg-linear-to-r ${becado.color} bg-clip-text text-transparent`}
                      >
                        {becado.role}
                      </div>
                    </div>

                    <p className="text-sm text-center text-foreground/60 leading-relaxed mb-6 grow line-clamp-4">
                      {becado.desc}
                    </p>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded bg-white/5 text-foreground/60 w-8 h-8 flex items-center justify-center">
                          {becado.icon}
                        </div>
                        <span className="text-xs font-semibold text-foreground/80 truncate max-w-30">
                          {becado.project}
                        </span>
                      </div>
                      <button className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <ChevronRight size={14} />
                      </button>
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
