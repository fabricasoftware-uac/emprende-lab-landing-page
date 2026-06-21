"use client";

import {
  ClipboardList,
  Rocket,
  Zap,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

interface PhaseData {
  number: string;
  name: string;
  duration: string;
  description: string;
  highlights: string[];
  icon: typeof ClipboardList;
  highlight?: boolean;
}

type PhaseStyle = {
  cardBg: string;
  cardBorder: string;
  textAccent: string;
  iconBg: string;
  iconBorder: string;
  iconText: string;
  dotColor: string;
  badgeClass: string;
};

const phases: PhaseData[] = [
  {
    number: "01",
    name: "Plan de Vuelo",
    duration: "1 mes",
    description:
      "Transformación de mentalidad. Aprende a pensar como emprendedor y define tu ruta estratégica.",
    highlights: [
      "Prototipado rápido",
      "Análisis de mercado",
      "Validación de idea",
    ],
    icon: ClipboardList,
  },
  {
    number: "02",
    name: "Gravedad 0",
    duration: "6 meses",
    description:
      "Construcción de tu startup. Desarrollo intenso de MVP con mentoría especializada y recursos dedicados.",
    highlights: ["Desarrollo de MVP", "Mentoría 1:1", "Demo Day"],
    icon: Rocket,
    highlight: true,
  },
  {
    number: "03",
    name: "Alunizaje",
    duration: "3 meses",
    description:
      "Validación en mercado real. Participa en ferias, consigue tus primeros clientes y genera ingresos.",
    highlights: ["Go-to-market", "Ferias y pitch", "Primeros clientes"],
    icon: Zap,
  },
  {
    number: "04",
    name: "Amartizaje",
    duration: "Continua",
    description:
      "Escalado y expansión. Aprende a crecer sin límites accediendo a nuevos mercados y rondas de inversión.",
    highlights: ["Escalabilidad", "Nuevos mercados", "Rondas de inversión"],
    icon: TrendingUp,
  },
];

const phaseStyles: Record<number, PhaseStyle> = {
  0: {
    cardBg: "bg-cyan-500/5",
    cardBorder: "border-cyan-500/30",
    textAccent: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    iconBorder: "border-cyan-500/20",
    iconText: "text-cyan-400",
    dotColor: "bg-cyan-500/50",
    badgeClass:
      "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
  1: {
    cardBg: "bg-purple-500/10",
    cardBorder: "border-purple-500/50",
    textAccent: "text-purple-400",
    iconBg: "bg-purple-500/20",
    iconBorder: "border-purple-500/40",
    iconText: "text-purple-300",
    dotColor: "bg-purple-500",
    badgeClass:
      "bg-purple-500/20 text-purple-200 border-purple-500/40",
  },
  2: {
    cardBg: "bg-amber-500/5",
    cardBorder: "border-amber-500/30",
    textAccent: "text-amber-400",
    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-500/20",
    iconText: "text-amber-400",
    dotColor: "bg-amber-500/50",
    badgeClass:
      "bg-amber-500/20 text-amber-200 border-amber-500/30",
  },
  3: {
    cardBg: "bg-emerald-500/5",
    cardBorder: "border-emerald-500/30",
    textAccent: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    iconText: "text-emerald-400",
    dotColor: "bg-emerald-500/50",
    badgeClass:
      "bg-emerald-500/20 text-emerald-200 border-emerald-500/30",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function SpaceLabProgram() {
  return (
    <section id="program" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,50,255,0.08),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] text-purple-400 uppercase bg-purple-400/10 border border-purple-400/20 rounded-full">
            Programa de Aceleración
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            <span className="bg-linear-to-r from-purple-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">
              SpaceLab
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Metodología de aceleración en 4 fases transformacionales. Del
            concepto a la expansión global.
          </p>
        </motion.div>

        {/* Desktop: horizontal stepper + cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden lg:block"
        >
          {/* Step numbers */}
          <div className="grid grid-cols-4 gap-0 relative mb-6">
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-linear-to-r from-cyan-500/30 via-purple-500/50 to-emerald-500/30" />
            {phases.map((phase, i) => {
              const s = phaseStyles[i];
              return (
                <div
                  key={i}
                  className="flex flex-col items-center relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.2, type: "spring" }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black mb-3 border-2 ${s.iconBg} ${s.iconBorder} ${s.iconText} ${
                      phase.highlight
                        ? "ring-4 ring-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                        : ""
                    }`}
                  >
                    {i + 1}
                  </motion.div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${s.textAccent}`}>
                    {phase.name}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 font-medium">
                    {phase.duration}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-5">
            {phases.map((phase, i) => {
              const s = phaseStyles[i];
              const Icon = phase.icon;
              return (
                <motion.div
                  variants={itemVariants}
                  key={i}
                  className={`relative group rounded-2xl border ${s.cardBorder} ${s.cardBg} p-6 transition-all duration-500 flex flex-col ${
                    phase.highlight
                      ? "ring-1 ring-purple-500/30 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]"
                      : "hover:border-purple-500/30"
                  }`}
                >
                  <div
                    className={`absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent ${s.dotColor === "bg-cyan-500/50" ? "via-cyan-400/50" : s.dotColor === "bg-purple-500" ? "via-purple-400/60" : s.dotColor === "bg-amber-500/50" ? "via-amber-400/50" : "via-emerald-400/50"} to-transparent`}
                  />

                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${s.iconBg} ${s.iconBorder} mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${s.iconText}`} />
                  </div>

                  <h3 className="text-xl font-black text-white mb-1">
                    {phase.name}
                  </h3>
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${s.textAccent} mb-4`}
                  >
                    {phase.duration}
                  </p>

                  <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    {phase.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {phase.highlights.map((h, hi) => (
                      <li
                        key={hi}
                        className="flex items-start gap-2 text-xs text-slate-300"
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${s.dotColor} shrink-0 mt-1.5`}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>


                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mobile / Tablet: vertical timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:hidden relative"
        >
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-linear-to-b from-cyan-500/30 via-purple-500/50 to-emerald-500/30" />

          <div className="space-y-8">
            {phases.map((phase, i) => {
              const s = phaseStyles[i];
              const Icon = phase.icon;
              return (
                <motion.div
                  variants={itemVariants}
                  key={i}
                  className="relative pl-16"
                >
                  <div
                    className={`absolute left-0 top-0 w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black border-2 z-10 ${s.iconBg} ${s.iconBorder} ${s.iconText} ${
                      phase.highlight
                        ? "ring-4 ring-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                        : ""
                    }`}
                  >
                    {i + 1}
                  </div>

                  <div
                    className={`rounded-2xl border ${s.cardBorder} ${s.cardBg} p-5 transition-all duration-500 flex flex-col ${
                      phase.highlight
                        ? "ring-1 ring-purple-500/30 shadow-[0_0_30px_-8px_rgba(168,85,247,0.25)]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${s.iconBg} ${s.iconBorder}`}
                      >
                        <Icon className={`w-5 h-5 ${s.iconText}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white leading-tight">
                          {phase.name}
                        </h3>
                        <p
                          className={`text-[10px] font-bold uppercase tracking-wider ${s.textAccent}`}
                        >
                          {phase.duration}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      {phase.description}
                    </p>

                    <ul className="space-y-1.5 mb-4">
                      {phase.highlights.map((h, hi) => (
                        <li
                          key={hi}
                          className="flex items-start gap-2 text-xs text-slate-300"
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${s.dotColor} shrink-0 mt-1.5`}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>


                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
