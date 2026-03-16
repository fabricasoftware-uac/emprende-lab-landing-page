"use client";

import { Rocket, Target, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Transferencia() {
  return (
    <section
      id="transferencia"
      className="relative py-20 sm:py-32 overflow-hidden bg-black/20"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-4 block">
            Alianzas Estratégicas
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
              Transferencia de Conocimiento
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Impulsamos la sinergia entre la universidad y la empresa para
            resolver misiones complejas del mundo real.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Centro de Propulsión */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="glass-hover flex flex-col rounded-3xl relative overflow-hidden group border border-white/5"
          >
            {/* Image Placeholder */}
            <div className="relative w-full h-48 md:h-64 bg-black/50 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" // REEMPLAZA CON FOTO DEL EQUIPO DE PROPULSION
                alt="Equipo del Centro de Propulsión"
                fill
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0a0f1d]/90"></div>
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <div className="inline-flex items-center justify-center p-3 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                  <Rocket className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity z-10 pointer-events-none">
              <Rocket size={120} className="text-purple-400" />
            </div>

            <div className="relative z-10 p-8 pt-6 flex-grow flex flex-col">
              <h3 className="text-3xl font-bold mb-4 text-white">
                Centro de Propulsión al Emprendedor
              </h3>

              <div className="space-y-4 mb-8 text-foreground/70">
                <p>
                  Programa de consultoría <strong>gratuita</strong> donde el
                  talento universitario se une para resolver problemas de
                  negocio.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Apoyo directo a emprendedores y startups en crecimiento.
                  </li>
                  <li>
                    Sinergia entre profesores expertos y estudiantes brillantes.
                  </li>
                  <li>
                    Proceso inmersivo con una duración de ~4 meses por misión.
                  </li>
                </ul>
              </div>

              <button className="flex items-center gap-2 text-purple-400 font-semibold group-hover:text-purple-300 transition-colors mt-auto">
                Aplicar al programa
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </motion.div>

          {/* Centro de Abordaje */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="glass-hover flex flex-col rounded-3xl relative overflow-hidden group border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
          >
            {/* Image Placeholder */}
            <div className="relative w-full h-48 md:h-64 bg-black/50 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop" // REEMPLAZA CON FOTO DEL CENTRO EMPRESARIAL
                alt="Consultoría Centro de Abordaje EmprendeLab"
                fill
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#0a0f1d]/90"></div>
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <div className="inline-flex items-center justify-center p-3 rounded-lg bg-linear-to-br from-cyan-500 to-blue-500 text-white shadow-lg">
                  <Target className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity z-10 pointer-events-none">
              <Target size={120} className="text-cyan-400" />
            </div>

            <div className="relative z-10 p-8 pt-6 flex-grow flex flex-col">
              <h3 className="text-3xl font-bold mb-4 text-white">
                Centro de Abordaje Empresarial
              </h3>

              <div className="space-y-4 mb-8 text-foreground/70">
                <p>
                  Servicios de consultoría{" "}
                  <strong>especializada y premium</strong> para empresas
                  consolidadas que requieren apoyo profesional profundo.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Diagnóstico avanzado de operaciones e innovación técnica.
                  </li>
                  <li>Soluciones a medida implementadas por especialistas.</li>
                  <li>
                    Transformación digital y modernización de infraestructura.
                  </li>
                </ul>
              </div>

              <button className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                Solicitar servicios
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
