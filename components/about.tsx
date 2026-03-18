"use client";

import { Rocket, Briefcase, BookOpen, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Centro de Propulsión",
    description:
      "Consultoría empresarial gratuita donde estudiantes y profesores ayudan a resolver problemas de negocio en 4 meses.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Centro de Abordaje",
    description:
      "Servicios de consultoría especializados para empresas que necesitan apoyo en áreas especializadas.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: (
      <span className="flex items-center gap-1.5 align-middle">
        Academia <span className="text-purple-500">EmprendeLab</span>
      </span>
    ),
    description:
      "Cursos, talleres y programas de formación para entrepreneurs en todas las etapas.",
    color: "from-orange-500 to-pink-500",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "SpaceLab Programa",
    description:
      "Metodología diseñada para transformar talento en emprendedores exitosos.",
    color: "from-yellow-500 to-orange-500",
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

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 flex items-center justify-center flex-wrap gap-x-2">
            <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              ¿Qué es
            </span>
            <Image
              src="/placeholder_elab.svg"
              alt="EmprendeLab"
              width={440}
              height={70}
              className="inline mt-4 -translate-y-1"
            />
            <span className="bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              ?
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Un ecosistema universitario de innovación que impulsa emprendedores
            mediante transferencia de conocimiento y programas de aceleración.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="group glass-hover p-8 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`inline-block p-4 rounded-xl bg-gradient-to-br ${service.color} mb-5 text-white group-hover:shadow-2xl transition-all`}
              >
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-white">
                {service.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {service.description}
              </p>

              {/* Decorative line */}
              <div className="w-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mt-4 group-hover:w-full transition-all duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { label: "Emprendimientos Activos", value: "150+" },
            { label: "Entrepreneurs Formados", value: "500+" },
            { label: "Consultoría Proporcionada", value: "1000+h" },
          ].map((stat, index) => (
            <div key={index} className="glass p-8 rounded-xl text-center">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
