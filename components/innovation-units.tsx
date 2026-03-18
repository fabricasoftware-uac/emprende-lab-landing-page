"use client";

import { Code, Lightbulb, ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const units = [
  {
    title: "Fábrica de Software",
    description:
      "Centro especializado en desarrollo de software personalizado. Transformamos ideas en soluciones digitales escalables y de alta calidad.",
    icon: <Code className="w-12 h-12" />,
    features: ["Desarrollo Custom", "Tecnología Avanzada", "Equipo Experto"],
    gradient: "from-blue-500 to-purple-500",
    accentColor: "blue",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Agencia InnHouse",
    description:
      "Unidad creativa especializada en innovación e implementación de estrategias digitales para empresas que buscan diferenciarse en el mercado.",
    icon: <Lightbulb className="w-12 h-12" />,
    features: ["Estrategia Digital", "Consultoría", "Implementación"],
    gradient: "from-orange-500 to-pink-500",
    accentColor: "orange",
    img: "/agencia_innHouse.webp",
  },
  {
    title: "Proyectos",
    description:
      "Desarrollo e implementación de proyectos de base tecnológica e innovación científica de alto impacto para aliados estratégicos.",
    icon: <Globe className="w-12 h-12" />,
    features: ["Innovación", "Escalabilidad", "Impacto Real"],
    gradient: "from-teal-500 to-emerald-500",
    accentColor: "teal",
    img: "/proyectos.webp",
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
      className="relative py-20 sm:py-32 overflow-hidden"
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
            <span className="bg-linear-to-r from-blue-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              Nuestros Servicios
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Servicios profesionales especializados que impulsan y hacen crecer
            tus ideas.
          </p>
        </motion.div>

        {/* Units Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {units.map((unit, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className={`glass-hover flex flex-col rounded-3xl relative overflow-hidden group border border-${unit.accentColor}-500/10 hover:border-${unit.accentColor}-500/30 transition-all duration-300`}
            >
              {/* Facility Image Placeholder */}
              <div className="relative w-full h-48 bg-black/40 overflow-hidden shrink-0">
                <Image
                  src={unit.img}
                  alt={`Instalaciones ${unit.title}`}
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-linear-to-b from-transparent to-[#080b13]/90`}
                ></div>
              </div>

              {/* Abstract background shape */}
              <div
                className={`absolute -right-10 top-20 w-40 h-40 bg-linear-to-br ${unit.gradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity z-0 pointer-events-none`}
              ></div>

              <div className="p-8 md:p-10 flex flex-col grow relative z-10 -mt-12">
                {/* Icon Background */}
                <div
                  className={`inline-block p-6 rounded-2xl bg-linear-to-br ${unit.gradient} text-white mb-6 group-hover:shadow-2xl transition-all shadow-lg self-start`}
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
                        className={`w-2 h-2 rounded-full bg-linear-to-r ${unit.gradient}`}
                      ></div>
                      <span className="text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`group/btn flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 hover:bg-gradient-to-r ${unit.gradient} hover:text-white transition-all font-medium`}
                >
                  Explorar unidades
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
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
