"use client";
import { motion } from "framer-motion";
import { Sparkles, Rocket, ArrowLeft, User, Linkedin, Instagram, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function EmpresasClient({ 
  empresas
}: { 
  empresas: any[]
}) {
  const tripuladas = empresas.filter((e) => !e.esAcelerada);
  const aceleradas = empresas.filter((e) => e.esAcelerada);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-32 relative overflow-hidden">
      <Navbar />
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-50 h-50 bg-blue-500/10 blur-[150px] -z-10 rounded-full mix-blend-screen"></div>
      <div className="absolute bottom-0 right-1/4 w-37.5 h-37.5 bg-cyan-500/10 blur-[120px] -z-10 rounded-full mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link 
          href="/#empresas" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors border max-w-fit px-4 py-2 border-white/5 bg-white/5 rounded-full"
        >
          <ArrowLeft size={16} />
          <span>Volver al inicio</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tight">
            Directorio <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">EmprendeLab</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Conoce en detalle a todas las startups y emprendedores que forman parte de nuestro ecosistema de innovación.
          </p>
        </motion.div>

        {/* --- TRIPULADAS SECTION --- */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-8">
            <div className="w-16 h-16 flex shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Rocket size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight">Empresas Tripuladas</h2>
              <p className="text-cyan-400/60 font-medium text-lg mt-1">Nuestras startups en proceso intensivo de aceleración</p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {tripuladas.map((empresa, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-linear-to-br from-cyan-500/20 to-blue-500/20 rounded-4xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-[#0a0a0b] border border-white/10 p-8 rounded-4xl h-full flex flex-col hover:border-white/20 transition-colors">
                  <div className="flex flex-col gap-2 mb-8">
                    <div className="relative w-40 sm:w-48 h-12 transform group-hover:scale-105 transition-transform duration-500 mb-2">
                       <Image 
                          src={empresa.logo || "/placeholder_elab.svg"} 
                          alt={empresa.name} 
                          fill
                          className="object-contain object-left relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
                       />
                    </div>
                    <span className="text-[10px] w-fit font-bold py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                      {empresa.category}
                    </span>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {empresa.name}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 grow">
                    {empresa.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                    <User size={16} className="text-cyan-400/50" />
                    <span className="text-sm font-medium text-slate-300">
                      Dirigida por <span className="text-white">{empresa.encargado}</span>
                    </span>
                  </div>

                  {(empresa.social?.instagram || empresa.social?.otro) && (
                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/5">
                      
                      {empresa.social.instagram && (
                        <Link href={empresa.social.instagram} target="_blank" className="text-slate-400 hover:text-cyan-400 transition-colors">
                          <Instagram size={18} />
                        </Link>
                      )}
                      {empresa.social.website && (
                        <Link href={empresa.social.website} target="_blank" className="text-slate-400 hover:text-cyan-400 transition-colors">
                          <Globe size={18} />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {tripuladas.length === 0 && (
              <p className="text-slate-400 col-span-3">No hay empresas tripuladas actualmente.</p>
            )}
          </motion.div>
        </div>

        {/* --- ACELERADAS SECTION --- */}
        <div>
          <div className="flex items-center gap-4 mb-12 border-b border-white/5 pb-8">
            <div className="w-16 h-16 flex shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Sparkles size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white tracking-tight">Empresas Aceleradas</h2>
              <p className="text-blue-400/60 font-medium text-lg mt-1">El portafolio de empresas ya impulsadas por EmprendeLab</p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {aceleradas.map((empresa, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative bg-[#0a0a0b] border border-white/5 rounded-2xl p-6 hover:bg-white/5 hover:border-blue-500/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex flex-col gap-2 mb-4">
                  <div className="relative w-32 sm:w-40 h-10 sm:h-12 transform group-hover:scale-105 transition-transform duration-500 mb-2">
                    <Image 
                      src={empresa.logo || "/placeholder_elab.svg"} 
                      alt={empresa.name} 
                      fill
                      className="object-contain object-left relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
                    />
                  </div>
                  <div>
                    <h5 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {empresa.name}
                    </h5>
                    <span className="text-[10px] text-blue-400/60 uppercase font-black tracking-wider">
                      {empresa.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors mb-4 grow">
                  {empresa.desc}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-blue-400/50" />
                    <span className="text-xs text-slate-400">Líder: <span className="text-slate-200">{empresa.encargado}</span></span>
                  </div>
                  
                  {(empresa.social?.linkedin || empresa.social?.instagram || empresa.social?.website) && (
                    <div className="flex items-center gap-3">
                      {empresa.social.linkedin && (
                        <Link href={empresa.social.linkedin} target="_blank" className="text-slate-400 hover:text-blue-400 transition-colors">
                          <Linkedin size={16} />
                        </Link>
                      )}
                      {empresa.social.instagram && (
                        <Link href={empresa.social.instagram} target="_blank" className="text-slate-400 hover:text-blue-400 transition-colors">
                          <Instagram size={16} />
                        </Link>
                      )}
                      {empresa.social.website && (
                        <Link href={empresa.social.website} target="_blank" className="text-slate-400 hover:text-blue-400 transition-colors">
                          <Globe size={16} />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {aceleradas.length === 0 && (
              <p className="text-slate-400 col-span-3">No hay empresas aceleradas actualmente.</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
