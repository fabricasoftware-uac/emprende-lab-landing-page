"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    name: "Fundación Mundo Mujer",
    category: "Transformación Digital",
    description:
      "Contribuimos al desarrollo sostenible de Colombia, estimulando el ahorro y generando acceso fácil y oportuno al crédito y a los servicios financieros complementarios para la comunidad trabajadora del país.",
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
    span: "lg:col-span-5",
  },
  {
    name: "PopayánInn",
    category: "Emprendimiento",
    description:
      "Programa que llega para transformar el ecosistema empresarial de la ciudad. Impulsado por la Alcaldía de Popayán, La Uniautónoma del Cauca y EmprendeLab, este espacio busca conectar, inspirar y potenciar a los emprendedores de la región.",
    img: "/popayaninn.webp",
    color: "from-orange-500/20 to-yellow-500/20",
    glow: "bg-orange-500/30",
    borderColor: "border-orange-500/20",
    hoverBorder: "hover:border-orange-500/50",
    site_url: "https://popayaninn.com/",
    span: "lg:col-span-7",
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

export default function Proyectos() {
  return (
    <section id="proyectos" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-purple-400 uppercase bg-purple-400/10 border border-purple-400/20 rounded-full">
            PORTAFOLIO
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Proyectos <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-purple-400">Destacados</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Soluciones tecnológicas e innovadoras desarrolladas desde nuestra Fábrica de Software para clientes y aliados estratégicos.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
            className={`${project.span} group relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0c] border ${project.borderColor} ${project.hoverBorder} transition-colors duration-500 min-h-87.5 flex flex-col p-8 sm:p-10`}
          >
            {/* Background Glows and Noise */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-transparent to-transparent z-0"></div>
            <div 
              className={`absolute -right-20 -top-20 w-80 h-80 ${project.glow} blur-[120px] rounded-full mix-blend-screen pointer-events-none transition-opacity duration-700 opacity-40 group-hover:opacity-100`}
            ></div>

            {/* Real Content */}
            <div className="relative z-10 flex flex-col h-full">
              
              {/* Header: Logo + Badge */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-auto gap-4">
                <div className="relative w-48 sm:w-56 h-16 transform group-hover:scale-105 transition-transform duration-500">
                  
                  <Image 
                    src={project.img} 
                    alt={project.name} 
                    fill
                    className="object-contain object-left relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
                  />
                </div>
                <span className="shrink-0 text-xs font-bold tracking-wider px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 uppercase w-fit">
                  {project.category}
                </span>
              </div>

              {/* Body: Info + Link */}
              <div className="mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="max-w-xl">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.site_url ? (
                  <Link 
                    href={project.site_url}
                    target="_blank"
                    className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border ${project.borderColor} hover:bg-white text-white hover:text-black transition-all duration-300 shadow-xl`}
                  >
                    <ExternalLink size={20} />
                  </Link>
                ) : (
                  <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/5 text-white/20 cursor-not-allowed">
                    <ExternalLink size={20} />
                  </div>
                )}
              </div>
              
            </div>
          </motion.div>
        ))}

        {/* CTA Card */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 group relative rounded-[2.5rem] overflow-hidden bg-linear-to-r from-purple-900/40 via-blue-900/40 to-cyan-900/40 border border-white/10 hover:border-blue-500/40 transition-all duration-500 p-8 sm:p-10 flex flex-col justify-center min-h-87.5"
          >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-start gap-4">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                ¿Tienes un proyecto en mente?
              </h3>
              <p className="text-slate-300 text-lg">
                Conectemos para evaluar tus ideas y lanzarlas al mundo.
              </p>
              
              <Link 
                href="https://ig.me/m/emprende_lab" 
                target="_blank"
                className="mt-4 flex items-center gap-3 px-8 py-4 rounded-full bg-white text-blue-950 font-bold hover:bg-slate-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <span>Hablemos de tu idea</span>
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
