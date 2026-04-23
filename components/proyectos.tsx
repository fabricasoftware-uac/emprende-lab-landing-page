"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const projects = [
  {
    name: "Fundación Mundo Mujer",
    category: "Transformación Digital",
    description:
      "Emprendelab, en alianza con la Fundación Mundo Mujer, desarrolló un programa de incubación y aceleración para 20 ganadoras del Premio Leonor Melo de Velasco, brindando formación en áreas clave y estrategias de posicionamiento. Como resultado, fortalecieron sus negocios, consolidaron sus modelos y aceleraron su crecimiento sostenible.",
    img: "/mundo_mujer.webp",
    color: "from-purple-500/20 to-pink-500/20",
    glow: "bg-purple-500/30",
    borderColor: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/50",
    site_url: "https://www.fmm.org.co/",
    span: "lg:col-span-7",
  },
  {
    name: "Bantotal",
    category: "Banca",
    description:
      "Bantotal es la plataforma bancaria líder en América Latina, que resuelve la operativa bancaria de misión crítica de Bancos, Financieras, Bancos Digitales, Fintech, e-Commerce, proveedores de Banca como Servicio, entre otros.",
    img: "/bantotal.webp",
    color: "from-blue-500/20 to-cyan-500/20",
    glow: "bg-blue-500/30",
    borderColor: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/50",
    site_url: "https://www.bantotal.com/",
    span: "lg:col-span-12 xl:col-span-5",
  },
  {
    name: "PopayánInn",
    category: "Emprendimiento",
    description:
      "Emprendelab, junto a la Universidad Autónoma del Cauca y la Secretaría DAFE de la Alcaldía de Popayán, desarrolló Popayán Inn, un programa de entrenamiento que fortaleció a más de 100 emprendedores en habilidades clave, con acompañamiento, capital semilla y asesoría continua, impulsando el crecimiento y consolidación de sus negocios.",
    img: "/popayaninn.webp",
    color: "from-orange-500/20 to-yellow-500/20",
    glow: "bg-orange-500/30",
    borderColor: "border-orange-500/20",
    hoverBorder: "hover:border-orange-500/50",
    site_url: "https://popayaninn.com/",
    span: "lg:col-span-12 xl:col-span-7",
  },
  {
    name: "Popayán UP",
    category: "Emprendimiento",
    description: "Emprendelab, junto a la Universidad Autónoma del Cauca y la Secretaría DAFE de la Alcaldía de Popayán, desarrolló Popayán Inn, un programa de entrenamiento que fortaleció a más de 100 emprendedores en habilidades clave, con acompañamiento, capital semilla y asesoría continua, impulsando el crecimiento y consolidación de sus negocios.",
    img: "/popayanup.webp",
    color: "from-orange-500/20 to-yellow-500/20",
    glow: "bg-orange-500/30",
    borderColor: "border-orange-500/20",
    hoverBorder: "hover:border-orange-500/50",
    site_url: "https://archivo.uniautonoma.edu.co/actualidad/noticias/popayanup-primer-hub-innovacion-fue-exito-rotundo",
    span: "lg:col-span-12 xl:col-span-5",
  },
];

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

interface Project {
  name: string;
  category: string;
  description: string;
  img: string;
  color?: string;
  glow?: string;
  borderColor?: string;
  hoverBorder?: string;
  site_url?: string | null;
  span?: string;
}

export default function Proyectos({ projects: projectsProp }: { projects?: Project[] }) {
  const displayProjects = projectsProp && projectsProp.length > 0 ? projectsProp : projects;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="proyectos" className="relative py-24 sm:py-32 overflow-hidden bg-background/50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full"></div>
      </div>

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
            Casos de éxito
          </motion.span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-8 tracking-tight text-white">
            Proyectos <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient">Destacados</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Transformamos visiones en productos digitales de alto rendimiento. Conoce algunos de los hitos desarrollados por nuestro ecosistema innovador.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {displayProjects.map((project, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              onClick={() => setSelectedProject(project)}
              className={`${project.span || "lg:col-span-6"} group cursor-pointer relative rounded-[3rem] overflow-hidden bg-slate-900/40 border ${project.borderColor || "border-white/10"} ${project.hoverBorder || "hover:border-purple-500/30"} transition-all duration-700 backdrop-blur-xl flex flex-col p-8 sm:p-12 hover:shadow-[0_20px_80px_-20px_rgba(168,85,247,0.15)]`}
            >
              {/* Overlay Gradient & Noise */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/20 to-slate-950/80 z-0"></div>
              
              {/* Dynamic Glow */}
              <div 
                className={`absolute -right-20 -top-20 w-100 h-100 ${project.glow || "bg-purple-500/20"} blur-[120px] rounded-full mix-blend-screen pointer-events-none transition-all duration-1000 opacity-20 group-hover:opacity-60 group-hover:scale-110`}
              ></div>

              {/* Content Container */}
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Header: Badge */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></div>
                    <span className="text-[9px] font-bold tracking-widest text-slate-300 uppercase">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Main Logo - Re-organized to be more prominent */}
                <div className="relative flex-1 flex items-center justify-center py-4">
                  <div className="relative h-24 w-full group-hover:scale-110 transition-transform duration-700">
                    <Image 
                      src={project.img || "/placeholder.webp"} 
                      alt={project.name} 
                      fill
                      className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] brightness-110" 
                    />
                  </div>
                </div>

                {/* Info Section - Bottom aligned */}
                <div className="mt-8 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tighter group-hover:text-purple-300 transition-colors duration-500">
                    {project.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-purple-400/80 group-hover:text-purple-400 transition-colors flex items-center gap-1">
                      Ver detalles <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
                      <Sparkles size={18} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Decorative Edge */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-12 xl:col-span-5 group relative rounded-[3rem] overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 p-1 sm:p-1 hover:shadow-[0_30px_100px_-20px_rgba(139,92,246,0.5)] transition-all duration-700"
            >
              <div className="h-full w-full bg-slate-950/40 backdrop-blur-2xl rounded-[2.9rem] p-10 sm:p-14 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 blur-[80px] rounded-full animate-pulse"></div>
                
                <div className="relative z-10 space-y-8">
                  <h3 className="text-4xl sm:text-5xl font-black text-white leading-[1.1] tracking-tighter">
                    ¿Iniciamos <br/> tu <span className="text-purple-300">próximo</span> <br/> proyecto?
                  </h3>
                  <p className="text-purple-100/70 text-lg sm:text-xl font-medium max-w-xs leading-relaxed">
                    Estamos listos para materializar tus ideas.
                  </p>
                  
                  <Link 
                    href="https://ig.me/m/emprende_lab" 
                    target="_blank"
                    className="group/btn inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-white text-indigo-950 font-black hover:bg-slate-100 transition-all shadow-2xl hover:scale-105 active:scale-95"
                  >
                    <span>COMENZAR AHORA</span>
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                      <ExternalLink size={16} />
                    </div>
                  </Link>
                </div>
              </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className=" bg-slate-950/95 border-white/10 backdrop-blur-3xl text-white rounded-[2.5rem] p-0 overflow-y-auto md:min-w-200 lg:min-w-250">
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col md:flex-row h-full max-h-[85vh] md:max-h-150"
              >
                {/* Modal Side: Image/Branding */}
                <div className="md:w-1/2 relative bg-slate-900 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-transparent"></div>
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
                  <div className="relative h-full w-full p-12 flex items-center justify-center">
                    <div className="relative w-full h-full max-h-48">
                      <Image 
                        src={selectedProject.img || "/placeholder.webp"} 
                        alt={selectedProject.name} 
                        fill
                        className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-slate-300">
                      {selectedProject.category}
                    </div>
                  </div>
                </div>

                {/* Modal Side: Details */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col relative bg-slate-950/50">
                  <DialogHeader className="mb-8 text-left">
                    <DialogTitle className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 leading-none">
                      {selectedProject.name}
                    </DialogTitle>
                    <div className="h-1 w-20 bg-linear-to-r from-purple-500 to-transparent rounded-full"></div>
                  </DialogHeader>

                  <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
                        <Sparkles size={14} className="text-purple-400" />
                        Visión del Proyecto
                      </h4>
                      <div className="space-y-4">
                        {selectedProject.description.split("\n").map((paragraph, pIdx) => (
                          <p key={pIdx} className="text-slate-300 text-lg leading-relaxed font-medium">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                      <div className="space-y-1">
                         <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enfoque</h4>
                         <p className="text-sm font-bold text-white/90">{selectedProject.category}</p>
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Estado</h4>
                         <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            Completado
                         </p>
                      </div>
                      {selectedProject.site_url && (
                        <div className="space-y-1">
                           <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sitio Web</h4>
                           <Link 
                             href={selectedProject.site_url} 
                             target="_blank" 
                             className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 group/link"
                           >
                             Ver página 
                             <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                           </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                    {selectedProject.site_url && (
                      <Link 
                        href={selectedProject.site_url}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-indigo-950 font-black hover:bg-slate-100 transition-all shadow-xl hover:scale-105 active:scale-95"
                      >
                        <span>VISITAR PROYECTO</span>
                        <ExternalLink size={18} />
                      </Link>
                    )}
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all text-slate-400 hover:text-white"
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
