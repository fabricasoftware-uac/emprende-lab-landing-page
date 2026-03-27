"use client";

import { motion, Variants } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  Users,
  Monitor,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Tienda() {
  return (
    <section id="tienda" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase bg-emerald-400/10 border border-emerald-400/20 rounded-full">
            Estrategias de Sostenibilidad
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Nuestra <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-400 to-green-400">Sostenibilidad</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explora y adquiere los productos, servicios y espacios creados para impulsar y sostener nuestro ecosistema.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Bento Card 1: Tienda */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-12 lg:col-span-7 group relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0c] border border-white/5 hover:border-emerald-500/30 transition-colors duration-500 min-h-110 flex flex-col"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/tienda.webp"
                alt="Tienda EmprendeLab"
                fill
                className="object-cover opacity-80 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent"></div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
            </div>

            <div className="relative z-10 p-8 sm:p-12 mt-auto flex flex-col h-full justify-end">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <ShoppingBag size={28} />
                </div>
              </div>
              <span className="text-emerald-400 text-sm font-bold tracking-widest uppercase mb-2">Comercio</span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                Tienda Local
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-2">
                Marketplace exclusivo de productos y servicios tecnológicos creados por emprendedores de nuestra comunidad.
              </p>
            </div>
          </motion.div>

          {/* Bento Card 2: Coworking */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-5 group relative rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-colors duration-500 min-h-110 flex flex-col"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/coworking.webp"
                alt="Coworking"
                fill
                className="object-cover opacity-50 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-[#0a0a0c]/10"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 blur-[60px] rounded-full mix-blend-screen pointer-events-none"></div>
            </div>

            <div className="relative z-10 p-8 sm:p-12 flex flex-col h-full justify-end">
              <div className="mb-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <Users size={28} />
                </div>
              </div>
              <span className="text-blue-400 text-sm font-bold tracking-widest uppercase mb-2">Creación</span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                Coworking
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Zonas de trabajo colaborativo diseñadas para fomentar el networking y la cocreación.
              </p>
            </div>
          </motion.div>

          {/* Bento Card 3: Sala de Juntas */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-6 lg:col-span-5 group relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0c] border border-white/5 hover:border-purple-500/30 transition-colors duration-500 min-h-87.5 flex flex-col"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/sala_juntas.webp"
                alt="Sala de Juntas"
                fill
                className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-[#0a0a0c]/90 to-[#0a0a0c]/30"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[60px] rounded-full mix-blend-screen pointer-events-none"></div>
            </div>

            <div className="relative z-10 p-8 sm:p-12 flex flex-col h-full justify-end">
              <div className="mb-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                  <Monitor size={28} />
                </div>
              </div>
              <span className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-2">Ejecutivo</span>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                Sala de Juntas
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Espacios con requerimientos para reuniones y pitchs formales.
              </p>
            </div>
          </motion.div>

          {/* Bento Card 4: CTA Solicitar Servicio */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-12 lg:col-span-7 group relative rounded-[2.5rem] overflow-hidden bg-linear-to-br from-emerald-900/40 via-teal-900/40 to-green-900/40 border border-white/10 hover:border-emerald-500/40 transition-all duration-500 p-8 sm:p-12 mb-8 flex flex-col justify-center"
          >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-start gap-8">
              <div className="max-w-xl">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  ¿Te interesa algún espacio o producto?
                </h3>
                <p className="text-slate-300 text-lg">
                  Nuestra comunidad está lista para recibirte. Solicita ahora mismo más información, reserva un espacio o adquiere nuestro talento.
                </p>
              </div>
              
              <Link 
                href="#contacto" 
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-emerald-950 font-bold hover:bg-emerald-100 hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                <ShoppingBag size={20} />
                <span>Solicitar Servicio</span>
                <ArrowRight size={18} className="ml-1" />
              </Link>
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}
