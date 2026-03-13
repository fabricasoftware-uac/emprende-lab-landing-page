"use client";

import { Code, Lightbulb, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const units = [
  {
    title: "Fábrica de Software",
    description:
      "Centro especializado en desarrollo de software personalizado. Transformamos ideas en soluciones digitales escalables y de alta calidad.",
    icon: <Code className="w-12 h-12" />,
    features: ["Desarrollo Custom", "Tecnología Avanzada", "Equipo Experto"],
    gradient: "from-blue-500 to-purple-500",
    accentColor: "blue",
  },
  {
    title: "Agencia InnHouse",
    description:
      "Unidad creativa especializada en innovación e implementación de estrategias digitales para empresas que buscan diferenciarse en el mercado.",
    icon: <Lightbulb className="w-12 h-12" />,
    features: ["Estrategia Digital", "Consultoría", "Implementación"],
    gradient: "from-orange-500 to-pink-500",
    accentColor: "orange",
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
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function InnovationUnits() {
  return (
    <section
      id="innovation"
      className="relative py-20 sm:py-32 overflow-hidden bg-[#080b13]"
    >
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
            <span className="bg-gradient-to-r from-blue-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              Unidades de Innovación
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Servicios profesionales especializados que necesitan visibilidad y
            promoción.
          </p>
        </motion.div>

        {/* Units Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {units.map((unit, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="group glass-hover p-8 rounded-3xl transition-all duration-300 hover:scale-105"
            >
              {/* Icon Background */}
              <div
                className={`inline-block p-6 rounded-2xl bg-gradient-to-br ${unit.gradient} text-white mb-6 group-hover:shadow-2xl transition-all`}
              >
                {unit.icon}
              </div>

              {/* Content */}
              <h3 className="text-3xl font-bold mb-4 text-white">
                {unit.title}
              </h3>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                {unit.description}
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {unit.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${unit.gradient}`}
                    ></div>
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`group/btn flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 hover:bg-gradient-to-r ${unit.gradient} hover:text-white transition-all font-medium`}
              >
                Conocer más
                <ArrowRight
                  size={18}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 glass rounded-3xl p-12 border border-white/10 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold mb-4 text-white">
            ¿Necesitas Servicios Especializados?
          </h3>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Contáctanos para conocer cómo nuestras unidades de innovación pueden
            ayudar a tu empresa a crecer y transformarse digitalmente.
          </p>
          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105">
            Solicitar Consulta
          </button>
        </motion.div>
      </div>
    </section>
  );
}
