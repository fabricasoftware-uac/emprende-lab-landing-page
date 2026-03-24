"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  desc: string;
  image?: string;
  imageColor?: string;
}

interface EquipoProps {
  team?: TeamMember[];
}

export default function Equipo({ team = [] }: EquipoProps) {
  if (!team || team.length === 0) return null;
  return (
    <section id="equipo" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-4 block">
            Quiénes Somos
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Tripulación Estelar
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            El equipo de élite en control de mando que hace posible cada
            lanzamiento impulsando el ecosistema.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative mb-6 rounded-3xl overflow-hidden aspect-3/4 glass p-2">
                <div
                  className={`w-full h-full rounded-2xl bg-linear-to-br ${member.imageColor} relative overflow-hidden flex items-end justify-center pb-8`}
                >
                  {/* Floating abstract astronaut visor helmet shape reflection */}
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_40%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0)_60%)] -translate-x-full group-hover:animate-shimmer"></div>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-black/20 backdrop-blur-md border border-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <span className="text-4xl text-white/50">👩‍🚀</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-blue-400 mb-3">
                  {member.role}
                </p>
                <p className="text-foreground/60 text-sm leading-relaxed max-w-[260px] mx-auto">
                  {member.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
