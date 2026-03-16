"use client";

import { motion } from "framer-motion";
import {
  UserCircle,
  Terminal,
  Palette,
  Briefcase,
  ChevronRight,
} from "lucide-react";

const becados = [
  {
    name: "Valentina Soler",
    role: "Frontend Developer",
    project: "ProApoyo / PopayánInn",
    icon: <Terminal />,
    color: "from-blue-400 to-cyan-400",
    desc: "Desarrolladora principal enfocada en crear interfaces de usuario accesibles y modernas.",
  },
  {
    name: "Mateo Rivas",
    role: "UX/UI Designer",
    project: "Fundación Mundo Mujer",
    icon: <Palette />,
    color: "from-pink-400 to-purple-400",
    desc: "Diseñador creativo, experto en flujos de usuario y prototipado espacial.",
  },
  {
    name: "Carmen Torres",
    role: "Project Manager",
    project: "Agencia InnHouse",
    icon: <Briefcase />,
    color: "from-orange-400 to-yellow-400",
    desc: "Líder de equipo y facilitadora ágil que asegura la gestión óptima de los recursos.",
  },
  {
    name: "Julian Paz",
    role: "Backend Engineer",
    project: "Bantotal Integration",
    icon: <Terminal />,
    color: "from-teal-400 to-emerald-400",
    desc: "Especialista en arquitecturas escalables y bases de datos relacionales.",
  },
];

export default function Becados() {
  return (
    <section id="becados" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-4 block">
            Mentores y Estudiantes
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-purple-300 via-pink-300 to-orange-300 bg-clip-text text-transparent">
              Talento Estelar (Becados)
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Conoce a los estudiantes brillantes que forman el corazón operativo
            de EmprendeLab, aportando su talento a misiones reales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {becados.map((becado, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-6 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-white/5 to-transparent rounded-bl-full -z-10"></div>

              {/* Avatar placeholder */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flexitems-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${becado.color} opacity-20`}
                  ></div>
                  <UserCircle
                    size={64}
                    strokeWidth={1}
                    className="text-white/60 mx-auto mt-4"
                  />
                </div>
              </div>

              <div className="text-center text-white mb-6">
                <h4 className="text-xl font-bold mb-1">{becado.name}</h4>
                <div
                  className={`text-sm font-semibold bg-linear-to-r ${becado.color} bg-clip-text text-transparent`}
                >
                  {becado.role}
                </div>
              </div>

              <p className="text-sm text-center text-foreground/60 leading-relaxed mb-6">
                {becado.desc}
              </p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-white/5 text-foreground/60">
                    {becado.icon}
                  </div>
                  <span className="text-xs font-semibold text-foreground/80 truncate max-w-[120px]">
                    {becado.project}
                  </span>
                </div>
                <button className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
