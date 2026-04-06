"use client";

import { BookOpen, Users, Star, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const academiaPrograms = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Cursos",
    description:
      "Programas intensivos diseñados para estructurar y validar ideas de negocio con metodologías ágiles de vanguardia.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Talleres",
    description:
      "Espacios prácticos de co-creación donde emprendedores y expertos resuelven retos específicos de sus startups.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Viernes Estelar",
    description:
      "Charlas inspiracionales cada viernes con líderes del ecosistema, inversores y fundadores exitosos.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Formación",
    description:
      "Rutas completas de aprendizaje para desarrollar habilidades gerenciales, tecnológicas y financieras clave.",
    color: "from-indigo-500 to-purple-500",
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

export default function Academia() {
  return (
    <section id="academia" className="relative py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Image Split */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 flex items-center justify-center lg:justify-start flex-wrap gap-x-2">
              <span className="bg-linear-to-r from-purple-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Academia
              </span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto lg:mx-0 mb-8">
              El centro de entrenamiento de nuestra tripulación espacial.
              Aprende, experimenta y prepara tu negocio para el despegue en
              nuestras instalaciones.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 w-full"
          >
            {/* Placeholder for Academia Facilities Image */}
            <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-video rounded-3xl overflow-hidden glass p-2 group">
              <div className="w-full h-full relative rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                <Image
                  src="/academia.webp"
                  alt="Instalaciones Academia EmprendeLab"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-purple-900/40 to-transparent"></div>

                {/* Overlay Text/Badge */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="backdrop-blur-md bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm font-semibold text-white">
                    📍 Instalaciones Academia
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {academiaPrograms.map((program, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="group glass-hover p-8 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden"
            >
              {/* Cosmico Bg Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center p-4 rounded-xl bg-linear-to-br ${program.color} mb-5 text-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all`}
              >
                {program.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-white">
                {program.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm">
                {program.description}
              </p>

              {/* Decorative line */}
              <div className="w-0 h-1 bg-linear-to-r from-purple-500 to-blue-500 mt-6 group-hover:w-full transition-all duration-300"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
