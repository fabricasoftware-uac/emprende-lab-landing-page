"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const phases = [
  {
    number: "01",
    name: "Plan de Vuelo",
    description:
      "Transformación de mentalidad. Aprende a pensar como emprendedor.",
    highlights: ["Mindset", "Fundamentos", "Visión estratégica"],
    icon: "📋",
  },
  {
    number: "02",
    name: "Gravedad 0",
    description: "Construcción del startup. 6 meses de desarrollo intenso.",
    highlights: ["Desarrollo", "MVP", "Producto inicial"],
    icon: "🛸",
    highlight: true,
  },
  {
    number: "03",
    name: "Alucinar",
    description:
      "Validación en mercado. Participa en ferias y genera ingresos.",
    highlights: ["Validación", "Go-to-market", "Revenue"],
    icon: "🌟",
  },
  {
    number: "04",
    name: "Aterrizaje",
    description: "Escalado y exportación. Aprende a crecer sin límites.",
    highlights: ["Escalabilidad", "Mercados", "Expansión"],
    icon: "🚀",
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function SpaceLabProgram() {
  return (
    <section id="program" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              Programa SpaceLab
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Tu misión hacia el emprendimiento exitoso en 4 fases
            transformacionales.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 origin-left"
          ></motion.div>

          {/* Phases Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {phases.map((phase, index) => (
              <motion.div
                variants={itemVariants}
                key={index}
                className={`relative group ${phase.highlight ? "lg:scale-105" : ""}`}
              >
                {/* Card */}
                <div
                  className={`glass-hover p-8 rounded-2xl transition-all duration-300 h-full ${
                    phase.highlight
                      ? "border-purple-500/50 bg-purple-500/5 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                      : ""
                  }`}
                >
                  {/* Phase Number */}
                  <div className="text-6xl font-bold text-purple-500/20 mb-4">
                    {phase.number}
                  </div>

                  {/* Icon */}
                  <div className="text-4xl mb-4">{phase.icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {phase.name}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    {phase.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {phase.highlights.map((highlight, hIndex) => (
                      <div
                        key={hIndex}
                        className="flex items-center gap-2 text-sm text-foreground/60"
                      >
                        <CheckCircle
                          size={16}
                          className="text-blue-400 flex-shrink-0"
                        />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  {/* Arrow indicator */}
                  {index < phases.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-2xl text-purple-500/30">
                      →
                    </div>
                  )}
                </div>

                {/* Mobile connecting dots */}
                {index < phases.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-transparent rounded-full"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105">
            Inicia tu Misión SpaceLab
          </button>
        </motion.div>
      </div>
    </section>
  );
}
