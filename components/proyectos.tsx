"use client";

import { motion } from "framer-motion";
import { ExternalLink, Building2, Code2, LineChart } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    name: "Fundación Mundo Mujer",
    category: "Transformación Digital",
    description:
      "Desarrollo de ecosistema digital para potenciar la educación financiera y el empoderamiento económico de las mujeres en la región.",
    icon: <LineChart className="w-5 h-5 text-purple-400" />,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    name: "Bantotal",
    category: "Fintech Innovation",
    description:
      "Integración de componentes tecnológicos avanzados y modernización de interfaces para el sistema bancario core líder en Latinoamérica.",
    icon: <Code2 className="w-5 h-5 text-blue-400" />,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    name: "PopayánInn",
    category: "Turismo Tech",
    description:
      "Plataforma integral para la gestión y promoción turística de la ciudad blanca, conectando visitantes con experiencias locales únicas.",
    icon: <Building2 className="w-5 h-5 text-orange-400" />,
    color: "from-orange-500/20 to-yellow-500/20",
    borderColor: "border-orange-500/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Proyectos() {
  return (
    <section id="proyectos" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-900/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-4 block">
            Portafolio
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Proyectos Destacados
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Soluciones tecnológicas e innovadoras desarrolladas desde nuestra
            Fábrica de Software para clientes y aliados estratégicos.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className={`glass-hover p-8 rounded-3xl border ${project.borderColor} relative group overflow-hidden transition-all duration-300 hover:shadow-xl`}
            >
              {/* Abstract Background Glow */}
              <div
                className={`absolute -inset-4 bg-linear-to-tr ${project.color} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`}
              ></div>

              <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                  {project.icon}
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/80">
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                {project.name}
              </h3>

              <p className="text-foreground/70 leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-sm text-foreground/50 group-hover:text-foreground/80 transition-colors">
                  Conocer más
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <ExternalLink size={14} className="text-foreground/70" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
