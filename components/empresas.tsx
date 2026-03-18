"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Sparkles,
  Hexagon,
  Code,
  Globe,
  Cpu,
  Zap,
  Leaf,
  Shield,
  Database,
  Droplets,
  Sun,
  Box,
} from "lucide-react";

// Mock data for 9 accelerated companies
const aceleradas = [
  {
    name: "NovaTech",
    category: "IA & Data",
    desc: "Plataforma predictiva para retail usando machine learning avanzado.",
    icon: <Cpu />,
  },
  {
    name: "EcoOrbital",
    category: "Sostenibilidad",
    desc: "Sistemas de monitoreo ambiental basados en sensores IoT.",
    icon: <Leaf />,
  },
  {
    name: "AeroChain",
    category: "Logística",
    desc: "Gestión de cadena de suministro internacional vía blockchain.",
    icon: <Box />,
  },
  {
    name: "BioGenix",
    category: "HealthTech",
    desc: "Diagnóstico médico temprano mediante análisis biométrico.",
    icon: <Hexagon />,
  },
  {
    name: "StellarVR",
    category: "EdTech",
    desc: "Educación inmersiva en realidad virtual para colegios.",
    icon: <Globe />,
  },
  {
    name: "SecureNode",
    category: "Ciberseguridad",
    desc: "Protección de datos empresariales impulsada por IA.",
    icon: <Shield />,
  },
  {
    name: "QuantumApp",
    category: "SaaS",
    desc: "Productividad y gestión de proyectos para equipos remotos.",
    icon: <Code />,
  },
  {
    name: "AquaPure",
    category: "Cleantech",
    desc: "Purificación de agua portátil para zonas rurales.",
    icon: <Droplets />,
  },
  {
    name: "Solaris Energy",
    category: "Energía",
    desc: "Optimización de paneles solares residenciales con IA.",
    icon: <Sun />,
  },
];

// Mock data for startups currently in acceleration
const tripuladas = [
  {
    name: "NextWallet",
    category: "Fintech",
    desc: "Billetera digital inclusiva para sectores no bancarizados rurales.",
    icon: <Zap />,
  },
  {
    name: "AgroData",
    category: "AgriTech",
    desc: "Predicción de cosechas mediante análisis de suelo e imágenes satelitales.",
    icon: <Database />,
  },
  {
    name: "SpaceHealth",
    category: "HealthTech",
    desc: "Telemedicina especializada para pacientes en áreas remotas extremas.",
    icon: <Rocket />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Empresas() {
  return (
    <section id="empresas" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest text-cyan-400 uppercase mb-4 block">
            Ecosistema EmprendeLab
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Empresas
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Conoce el portafolio de startups que han superado nuestras misiones
            y aquellas que actualmente están en órbita.
          </p>
        </motion.div>

        {/* Empresas Aceleradas */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <Sparkles className="text-blue-400" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white">
              Empresas Aceleradas
            </h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {aceleradas.map((empresa, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass p-6 rounded-2xl hover:glass-hover transition-all duration-300 group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                    {empresa.icon}
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/70">
                    {empresa.category}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {empresa.name}
                </h4>
                <p className="text-sm text-foreground/60 flex-grow">
                  {empresa.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Empresas Tripuladas */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
              <Rocket className="text-cyan-400" size={24} />
            </div>
            <h3 className="text-3xl font-bold text-white">
              Empresas Tripuladas
            </h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {tripuladas.map((empresa, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass p-6 rounded-2xl border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    {empresa.icon}
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-200">
                    {empresa.category}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {empresa.name}
                </h4>
                <p className="text-sm text-foreground/60 flex-grow">
                  {empresa.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                  En proceso de aceleración
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
